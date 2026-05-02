/* ============================================================
   Dilamco — Shared layout (Topbar, Footer, CartDrawer)
   ============================================================ */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158.418 30.76" fill="currentColor"><g><path d="M.217,30.28V.48h9.72c3.227,0,6.026.64,8.4,1.92,2.374,1.28,4.213,3.04,5.52,5.28,1.307,2.24,1.96,4.8,1.96,7.68s-.654,5.448-1.96,7.701c-1.307,2.254-3.146,4.02-5.52,5.3s-5.173,1.92-8.4,1.92H.217ZM6.417,24.88h3.68c1.946,0,3.626-.393,5.04-1.18,1.413-.786,2.513-1.893,3.3-3.32.787-1.426,1.18-3.1,1.18-5.02,0-1.946-.394-3.626-1.18-5.04-.787-1.413-1.887-2.506-3.3-3.28-1.414-.773-3.094-1.16-5.04-1.16h-3.68v19Z"/><path d="M29.337,6.48V.48h6v6h-6ZM29.337,30.28V8.44h6v21.84h-6Z"/><path d="M39.737,30.28V0h6v30.28h-6Z"/><path d="M56.896,30.761c-1.573,0-2.934-.254-4.08-.761-1.146-.506-2.026-1.232-2.64-2.18-.614-.946-.92-2.073-.92-3.38,0-1.227.279-2.313.84-3.26.56-.946,1.42-1.74,2.58-2.381,1.16-.64,2.606-1.093,4.34-1.359l6.68-1.081v4.401l-5.6,1c-.854.159-1.507.434-1.96.819-.454.387-.681.94-.681,1.66,0,.667.254,1.187.761,1.56.506.374,1.133.561,1.88.561.986,0,1.853-.213,2.6-.64.746-.427,1.326-1.007,1.74-1.74.413-.733.62-1.54.62-2.42v-5.681c0-.825-.327-1.52-.98-2.08s-1.54-.84-2.659-.84c-1.067,0-2.008.293-2.82.88-.813.587-1.407,1.36-1.78,2.32l-4.8-2.28c.426-1.227,1.106-2.28,2.04-3.16.933-.88,2.053-1.56,3.36-2.04,1.306-.48,2.732-.72,4.279-.72,1.84,0,3.467.333,4.88,1s2.514,1.594,3.301,2.78c.786,1.187,1.18,2.567,1.18,4.14v14.401h-5.601v-3.52l1.36-.24c-.64.96-1.347,1.754-2.12,2.38-.773.627-1.64,1.094-2.6,1.399-.96.307-2.027.461-3.2.461Z"/><path d="M73.457,30.28V8.44h5.6v5.32l-.6-.88c.319-1.68,1.093-2.92,2.319-3.72,1.227-.8,2.693-1.2,4.4-1.2,1.813,0,3.406.46,4.78,1.38,1.373.92,2.233,2.154,2.58,3.7l-1.721.16c.721-1.786,1.747-3.106,3.08-3.96,1.333-.853,2.894-1.28,4.681-1.28,1.573,0,2.966.347,4.18,1.04,1.213.693,2.166,1.66,2.86,2.9.692,1.24,1.04,2.687,1.04,4.34v14.041h-6v-12.76c0-.854-.154-1.587-.46-2.201-.308-.613-.74-1.093-1.301-1.44-.56-.346-1.239-.52-2.04-.52-.773,0-1.446.174-2.02.52-.574.347-1.014.827-1.32,1.44s-.46,1.347-.46,2.201v12.76h-6v-12.76c0-.854-.153-1.587-.46-2.201s-.74-1.093-1.3-1.44c-.56-.346-1.24-.52-2.04-.52-.773,0-1.447.174-2.02.52-.574.347-1.015.827-1.32,1.44-.307.613-.46,1.347-.46,2.201v12.76h-6Z"/><path d="M121.336,30.761c-2.187,0-4.153-.5-5.9-1.5-1.746-1-3.133-2.367-4.159-4.101-1.027-1.733-1.54-3.68-1.54-5.84s.506-4.1,1.52-5.82,2.4-3.073,4.16-4.06c1.76-.986,3.733-1.48,5.92-1.48,1.626,0,3.133.28,4.521.84,1.386.56,2.572,1.34,3.56,2.34.986,1,1.693,2.18,2.12,3.54l-5.2,2.24c-.374-1.093-1.007-1.96-1.9-2.6s-1.927-.96-3.1-.96c-1.04,0-1.967.254-2.78.76-.813.507-1.453,1.214-1.92,2.12-.467.908-.7,1.948-.7,3.121s.233,2.214.7,3.12,1.106,1.613,1.92,2.12,1.74.76,2.78.76c1.2,0,2.24-.32,3.12-.96s1.506-1.507,1.88-2.601l5.2,2.28c-.4,1.28-1.094,2.427-2.08,3.44-.987,1.014-2.174,1.807-3.56,2.38-1.388.573-2.907.86-4.561.86Z"/><path d="M145.895,30.761c-2.16,0-4.127-.493-5.9-1.48-1.773-.986-3.187-2.34-4.239-4.06-1.054-1.721-1.58-3.674-1.58-5.86,0-2.213.526-4.173,1.58-5.88,1.053-1.707,2.466-3.053,4.239-4.04,1.773-.986,3.74-1.48,5.9-1.48s4.12.494,5.88,1.48c1.76.987,3.166,2.333,4.22,4.04,1.054,1.707,1.58,3.667,1.58,5.88,0,2.187-.526,4.14-1.58,5.86-1.054,1.72-2.46,3.073-4.22,4.06-1.76.987-3.72,1.48-5.88,1.48ZM145.895,25.361c1.093,0,2.046-.253,2.86-.76.812-.507,1.453-1.214,1.92-2.12.466-.906.699-1.946.699-3.12s-.233-2.206-.699-3.1c-.467-.894-1.107-1.601-1.92-2.121-.814-.52-1.768-.78-2.86-.78s-2.054.26-2.88.78c-.827.52-1.474,1.227-1.94,2.121-.467.894-.7,1.927-.7,3.1s.233,2.214.7,3.12,1.113,1.613,1.94,2.12c.826.507,1.786.76,2.88.76Z"/></g></svg>`;

function Logo({ className = "topbar__logo" }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />;
}

function Topbar({ route }) {
  const cart = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const cur = '/' + (route.parts[0] || '');
  const isActive = (path) => cur === path || (path === '/catalogue' && route.parts[0] === 'produit');

  React.useEffect(() => { setMenuOpen(false); }, [route.parts.join('/')]);

  const links = [
    ['#/catalogue', 'Catalogue', '/catalogue'],
    ['#/collections', 'Collections', '/collections'],
    ['#/savoir-faire', 'Savoir-faire', '/savoir-faire'],
    ['#/projets', 'Projets', '/projets'],
  ];

  return (
    <header className="topbar">
      <div className="topbar__strip">
        Entrepôt à Montréal · 20+ ans <span>·</span> Soumission sous 48h
      </div>
      <div className="topbar__main">
        <button className="topbar__burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
          <span></span><span></span><span></span>
        </button>
        <nav className="topbar__nav">
          {links.map(([href, label, path]) => (
            <a key={href} href={href} className={isActive(path) ? 'is-active' : ''}>{label}</a>
          ))}
        </nav>
        <a href="#/" aria-label="Dilamco accueil" className="topbar__logo-link"><Logo /></a>
        <div className="topbar__actions">
          <a href="#/savoir-faire" className="topbar__action topbar__action--showroom">Showroom Montréal</a>
          <button className="cart-pill" onClick={() => cart.setDrawerOpen(true)}>
            <span className="cart-pill__label">Mon projet</span>
            <span className="cart-pill__label-mobile">Projet</span>
            <span className="cart-pill__count">{cart.totalQty}</span>
          </button>
        </div>
      </div>

      <div className={'mobile-menu ' + (menuOpen ? 'is-open' : '')} onClick={() => setMenuOpen(false)}>
        <div className="mobile-menu__panel" onClick={e => e.stopPropagation()}>
          <div className="mobile-menu__head">
            <Logo />
            <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Fermer">×</button>
          </div>
          <nav className="mobile-menu__nav">
            {links.map(([href, label, path]) => (
              <a key={href} href={href} className={isActive(path) ? 'is-active' : ''}>{label}<span className="arr">→</span></a>
            ))}
            <a href="#/soumission" className="mobile-menu__cta">Demander une soumission<span className="arr">→</span></a>
          </nav>
          <div className="mobile-menu__foot">
            <span className="mono">Showroom · 275 Beaubien O · Montréal</span>
            <a href="tel:5142225300" className="mono">514 222 5300</a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__main">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p className="footer__tag">Distribution premium d'armoires sur mesure depuis Montréal. Une chaîne d'approvisionnement maîtrisée, du dessin à l'installation.</p>
          </div>
          <div className="footer__col">
            <h4>Catalogue</h4>
            <ul>
              <li><a href="#/catalogue?famille=Armoire+murale">Armoires murales</a></li>
              <li><a href="#/catalogue?famille=Armoire+de+bas">Armoires de bas</a></li>
              <li><a href="#/catalogue?famille=Garde-manger">Garde-manger</a></li>
              <li><a href="#/catalogue?coin=oui">Modules de coin</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Maison</h4>
            <ul>
              <li><a href="#/savoir-faire">Notre supply chain</a></li>
              <li><a href="#/projets">Projets réalisés</a></li>
              <li><a href="#/collections">Collections</a></li>
              <li><a href="#/soumission">Demander une soumission</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>9876 Boul. Industriel<br/>Montréal, QC H1Z 2X4</li>
              <li><a href="mailto:projets@dilamco.ca">projets@dilamco.ca</a></li>
              <li><a href="tel:5142225300">514 222 5300</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Dilamco Distribution Inc. — Tous droits réservés</span>
          <span>RBQ 5712-2440-01 · APCHQ membre</span>
        </div>
      </div>
    </footer>
  );
}

function CartDrawer() {
  const cart = useCart();
  const open = cart.drawerOpen;

  return (
    <React.Fragment>
      <div className={'drawer-overlay ' + (open ? 'is-open' : '')} onClick={() => cart.setDrawerOpen(false)} />
      <aside className={'drawer ' + (open ? 'is-open' : '')}>
        <div className="drawer__head">
          <span className="drawer__title">Mon projet · {cart.totalQty} module{cart.totalQty !== 1 ? 's' : ''}</span>
          <button className="drawer__close" onClick={() => cart.setDrawerOpen(false)} aria-label="Fermer">×</button>
        </div>
        <div className="drawer__body">
          {cart.items.length === 0 ? (
            <div className="drawer__empty">
              <span className="serif">Votre projet est vide.</span>
              <p>Ajoutez des modules depuis le catalogue pour bâtir votre estimation.</p>
              <button className="btn btn--ghost btn--small" style={{marginTop: 24}} onClick={() => { cart.setDrawerOpen(false); navigate('/catalogue'); }}>
                Parcourir le catalogue
              </button>
            </div>
          ) : (
            cart.items.map(item => (
              <LineItem key={item.key} item={item} />
            ))
          )}
        </div>
        {cart.items.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__totals">
              <div className="drawer__total-row">
                <span>Modules</span>
                <span className="mono">{cart.totalQty}</span>
              </div>
              <div className="drawer__total-row">
                <span>Sous-total catalogue</span>
                <span className="mono">${cart.subtotal.toLocaleString('fr-CA')} CAD</span>
              </div>
              <div className="drawer__total-row drawer__total-row--big">
                <span>Estimation</span>
                <span>${cart.subtotal.toLocaleString('fr-CA')}</span>
              </div>
            </div>
            <button className="btn btn--primary btn--block" onClick={() => { cart.setDrawerOpen(false); navigate('/soumission'); }}>
              Demander la soumission <span className="arr">→</span>
            </button>
            <p className="drawer__note">Le prix final inclut panneaux de finition, fillers, livraison et installation. Soumission ferme sous 48h après validation des dimensions.</p>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

function LineItem({ item }) {
  const cart = useCart();
  const product = window.__products.find(p => p.id === item.productId);
  return (
    <div className="line-item">
      <div className="line-item__img">
        {product && <window.ModuleRender product={product} color={item.color} molding={item.molding} />}
      </div>
      <div className="line-item__main">
        <span className="line-item__name">{item.name}</span>
        <span className="line-item__opts">{item.color} · Shaker {item.molding}</span>
        <div className="line-item__qty">
          <button onClick={() => cart.updateQty(item.key, item.qty - 1)}>−</button>
          <span className="mono">{item.qty}</span>
          <button onClick={() => cart.updateQty(item.key, item.qty + 1)}>+</button>
          <button className="line-item__remove" onClick={() => cart.removeItem(item.key)}>retirer</button>
        </div>
      </div>
      <div className="line-item__price">${(item.price * item.qty).toLocaleString('fr-CA')}</div>
    </div>
  );
}

window.Topbar = Topbar;
window.Footer = Footer;
window.CartDrawer = CartDrawer;
window.Logo = Logo;
