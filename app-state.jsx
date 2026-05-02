/* ============================================================
   Dilamco — App State (cart, route, project)
   Hash-based router + cart context.
   ============================================================ */

const { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext } = React;

/* -------- Hash router -------- */
function parseHash() {
  const h = (window.location.hash || '#/').replace(/^#/, '');
  const [path, query = ''] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const params = {};
  for (const kv of query.split('&')) {
    if (!kv) continue;
    const [k, v] = kv.split('=');
    params[decodeURIComponent(k)] = decodeURIComponent(v || '');
  }
  return { parts, params, raw: h };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route.raw]);
  return route;
}

function navigate(path) {
  window.location.hash = '#' + path;
}

/* -------- Cart context -------- */
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('dilamco-cart');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dilamco-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, opts) => {
    const key = `${product.id}|${opts.color}|${opts.molding}`;
    setItems(prev => {
      const existing = prev.find(it => it.key === key);
      if (existing) {
        return prev.map(it => it.key === key ? { ...it, qty: it.qty + (opts.qty || 1) } : it);
      }
      return [...prev, {
        key,
        productId: product.id,
        name: product.name,
        family: product.family,
        price: product.price,
        w: product.w, h: product.h, d: product.d,
        color: opts.color,
        molding: opts.molding,
        qty: opts.qty || 1,
      }];
    });
    setDrawerOpen(true);
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems(prev => qty <= 0
      ? prev.filter(it => it.key !== key)
      : prev.map(it => it.key === key ? { ...it, qty } : it));
  }, []);

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(it => it.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const totalQty = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  const value = { items, subtotal, totalQty, addItem, updateQty, removeItem, clear, drawerOpen, setDrawerOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() { return useContext(CartContext); }

window.useRoute = useRoute;
window.navigate = navigate;
window.CartProvider = CartProvider;
window.useCart = useCart;
