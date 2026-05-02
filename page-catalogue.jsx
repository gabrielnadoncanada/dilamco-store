/* ============================================================
   Dilamco — Page: Catalogue
   ============================================================ */

const FAMILY_ORDER = ['Armoire murale', 'Armoire de bas', 'Garde-manger', 'Armoire au-dessus du réfrigérateur', 'Armoire murale de coin', 'Armoire de bas de coin', 'Garde-manger de coin'];
const COLORS_ALL = ['Blanc Pur', 'Chêne blanc', 'Bleu marin'];

function Catalogue({ route }) {
  const products = window.__products;
  const [filters, setFilters] = useState(() => ({
    families: route.params.famille ? [route.params.famille] : [],
    colors: [],
    moldings: [],
    ceilings: [],
    corner: route.params.coin === 'oui' ? 'corner' : 'all',
    sort: 'family'
  }));

  // Sync from URL on first mount
  useEffect(() => {
    if (route.params.famille) {
      setFilters(f => ({ ...f, families: [route.params.famille] }));
    }
    if (route.params.coin === 'oui') {
      setFilters(f => ({ ...f, corner: 'corner' }));
    }
  }, [route.params.famille, route.params.coin]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filters.families.length && !filters.families.includes(p.family)) return false;
      if (filters.colors.length && !p.colors.some(c => filters.colors.includes(c))) return false;
      if (filters.moldings.length && !p.moldings.some(m => filters.moldings.includes(m))) return false;
      if (filters.ceilings.length && p.ceiling && !filters.ceilings.includes(p.ceiling)) return false;
      if (filters.corner === 'corner' && (p.corner === 'Non' || !p.corner)) return false;
      if (filters.corner === 'straight' && p.corner && p.corner !== 'Non') return false;
      return true;
    }).sort((a, b) => {
      if (filters.sort === 'price-asc') return a.price - b.price;
      if (filters.sort === 'price-desc') return b.price - a.price;
      if (filters.sort === 'width') return (a.w||0) - (b.w||0);
      // default: family then width
      const fa = FAMILY_ORDER.indexOf(a.family); const fb = FAMILY_ORDER.indexOf(b.family);
      if (fa !== fb) return fa - fb;
      return (a.w||0) - (b.w||0);
    });
  }, [filters, products]);

  // Counts for filter labels
  const familyCounts = useMemo(() => {
    const m = {};
    products.forEach(p => { m[p.family] = (m[p.family]||0)+1; });
    return m;
  }, [products]);

  const toggleArr = (key, value) => setFilters(f => {
    const arr = f[key] || [];
    return { ...f, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
  });

  const reset = () => setFilters({ families: [], colors: [], moldings: [], ceilings: [], corner: 'all', sort: 'family' });

  const activeFilterCount = filters.families.length + filters.colors.length + filters.moldings.length + filters.ceilings.length + (filters.corner !== 'all' ? 1 : 0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="catalog">
      <div className="catalog__head">
        <div>
          <span className="eyebrow eyebrow--accent">Catalogue technique</span>
          <h1 className="catalog__title" style={{ marginTop: 8 }}>Armoires de cuisine</h1>
        </div>
        <div className="catalog__head-actions">
          <span className="catalog__meta">{filtered.length} module{filtered.length !== 1 ? 's' : ''} sur {products.length}</span>
          <select className="catalog__sort" value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
            <option value="family">Trier · Famille</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="width">Largeur</option>
          </select>
          <button className="catalog__filter-btn" onClick={() => setFiltersOpen(true)}>
            Filtres{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
          </button>
        </div>
      </div>

      <aside className={'filters ' + (filtersOpen ? 'is-open' : '')}>
        <div className="filters__head">
          <span className="filters__title">Filtres</span>
          <button className="filters__close" onClick={() => setFiltersOpen(false)} aria-label="Fermer">×</button>
        </div>
        <div className="filter">
          <div className="filter__label">Famille</div>
          <div className="filter__list">
            {FAMILY_ORDER.filter(f => familyCounts[f]).map(f => (
              <label key={f} className="filter__item">
                <input type="checkbox" checked={filters.families.includes(f)} onChange={() => toggleArr('families', f)} />
                {f}
                <span className="filter__count">{familyCounts[f]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter">
          <div className="filter__label">Couleur</div>
          <div className="filter__list">
            {COLORS_ALL.map(c => (
              <label key={c} className="filter__item">
                <input type="checkbox" checked={filters.colors.includes(c)} onChange={() => toggleArr('colors', c)} />
                <span className={'swatch swatch--' + (c === 'Blanc Pur' ? 'blanc' : c === 'Chêne blanc' ? 'chene' : 'bleu')} />
                {c}
              </label>
            ))}
          </div>
        </div>

        <div className="filter">
          <div className="filter__label">Moulure Shaker</div>
          <div className="filter__chips">
            {['1 po', '3 po'].map(m => (
              <button key={m} className={'chip ' + (filters.moldings.includes(m) ? 'is-active' : '')} onClick={() => toggleArr('moldings', m)}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="filter">
          <div className="filter__label">Hauteur de plafond</div>
          <div className="filter__chips">
            {['8 pi', '9 pi'].map(c => (
              <button key={c} className={'chip ' + (filters.ceilings.includes(c) ? 'is-active' : '')} onClick={() => toggleArr('ceilings', c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="filter">
          <div className="filter__label">Configuration</div>
          <div className="filter__chips">
            {[['all', 'Toutes'], ['straight', 'Droites'], ['corner', 'Coin']].map(([v, l]) => (
              <button key={v} className={'chip ' + (filters.corner === v ? 'is-active' : '')} onClick={() => setFilters(f => ({ ...f, corner: v }))}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {activeFilterCount > 0 && (
          <button className="filter__clear" onClick={reset}>Réinitialiser les filtres ({activeFilterCount})</button>
        )}

        <button className="filters__apply" onClick={() => setFiltersOpen(false)}>
          Voir {filtered.length} module{filtered.length !== 1 ? 's' : ''}
        </button>
      </aside>
      {filtersOpen && <div className="filters__overlay" onClick={() => setFiltersOpen(false)} />}

      <div>
        <div className="pgrid" style={{ '--cols': 'var(--pgrid-cols, 3)' }}>
          {filtered.slice(0, 60).map(p => <PCard key={p.id} product={p} />)}
        </div>
        {filtered.length > 60 && (
          <div style={{ textAlign: 'center', marginTop: 56, fontSize: 13, color: 'var(--muted)' }}>
            Affichage 60 sur {filtered.length}. Affinez les filtres pour voir le reste.
          </div>
        )}
        {filtered.length === 0 && (
          <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--muted)' }}>
            Aucun module ne correspond à ces critères.<br/>
            <button className="filter__clear" onClick={reset} style={{ marginTop: 16 }}>Réinitialiser les filtres</button>
          </div>
        )}
      </div>
    </div>
  );
}

function PCard({ product }) {
  const defaultColor = product.colors[0] || 'Blanc Pur';
  const defaultMolding = product.moldings[0] || '1 po';
  const cart = useCart();
  const photo = window.photoForProduct ? window.photoForProduct(product, defaultColor) : null;
  return (
    <a className="pcard" href={`#/produit/${product.id}`}>
      <div className="pcard__img-wrap">
        <span className="pcard__badge">{product.id}</span>
        {photo && (
          <div className="pcard__photo" style={{ backgroundImage: `url(${photo})` }} />
        )}
        <div className="pcard__module-svg pcard__module-svg--overlay">
          <window.ModuleRender product={product} color={defaultColor} molding={defaultMolding} />
        </div>
        <div className="pcard__hover-info">
          <button className="pcard__quick" onClick={(e) => { e.preventDefault(); cart.addItem(product, { color: defaultColor, molding: defaultMolding, qty: 1 }); }}>
            Ajouter au projet
          </button>
        </div>
      </div>
      <div className="pcard__meta">
        <span className="pcard__family">{product.family.toUpperCase()} · {product.ceiling || ''}</span>
        <span className="pcard__name">{product.name}</span>
        <div className="pcard__bottom">
          <span className="pcard__price">${product.price.toLocaleString('fr-CA')}</span>
          <div className="pcard__swatches">
            {product.colors.map(c => (
              <span key={c} className={'swatch swatch--' + (c === 'Blanc Pur' ? 'blanc' : c === 'Chêne blanc' ? 'chene' : 'bleu')} title={c} />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

window.Catalogue = Catalogue;
window.PCard = PCard;
