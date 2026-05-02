/* ============================================================
   Dilamco — Page: Product detail
   ============================================================ */

const COLOR_DESC = {
  'Blanc Pur': 'Blanc opaque, finition mate. La référence neutre du catalogue.',
  'Chêne blanc': 'Placage bouleau teinté chêne, veinage horizontal apparent.',
  'Bleu marin': 'Bleu profond mat, finition catalysée. Pour les îlots et coins repas.',
};

function Produit({ route }) {
  const id = route.parts[1];
  const product = window.__products.find(p => p.id === id);
  const cart = useCart();
  const [color, setColor] = useState(product?.colors[0] || 'Blanc Pur');
  const [molding, setMolding] = useState(product?.moldings[0] || '1 po');
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 32 }}>Module introuvable.</h2>
        <a className="btn btn--ghost" style={{ marginTop: 24 }} href="#/catalogue">Retour au catalogue</a>
      </div>
    );
  }

  // Related products (same family, different size)
  const related = window.__products.filter(p => p.family === product.family && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    cart.addItem(product, { color, molding, qty });
  };

  // Photo gallery: ambiance photo + technical render + 2 detail shots
  const ambiancePhoto = window.photoForProduct ? window.photoForProduct(product, color) : null;
  const inSitu = window.inSituFor ? window.inSituFor(product) : [];
  const views = [
    { type: 'photo', src: ambiancePhoto, label: 'Ambiance' },
    { type: 'svg', label: 'Vue technique' },
    { type: 'photo', src: inSitu[1], label: 'Détail · Moulure' },
    { type: 'photo', src: inSitu[2], label: 'Atelier' },
  ];
  const current = views[view] || views[0];

  return (
    <div className="pdp">
      <div className="pdp__crumb">
        <a href="#/">Accueil</a> / <a href="#/catalogue">Catalogue</a> / <a href={`#/catalogue?famille=${encodeURIComponent(product.family)}`}>{product.family}</a> / <span>{product.id}</span>
      </div>
      <div className="pdp__main">
        <div className="pdp__gallery">
          <div className="pdp__hero-img">
            {current.type === 'photo' && current.src ? (
              <div className="pdp__photo" style={{ backgroundImage: `url(${current.src})` }} />
            ) : (
              <div className="pdp__module-svg">
                <window.ModuleRender product={product} color={color} molding={molding} />
              </div>
            )}
            <div className="pdp__view-label">FIG.{String(view + 1).padStart(2, '0')} · {current.label}</div>
          </div>
          <div className="pdp__thumbs">
            {views.map((v, i) => (
              <div key={i} className={'pdp__thumb ' + (view === i ? 'is-active' : '')} onClick={() => setView(i)}>
                {v.type === 'photo' && v.src ? (
                  <div className="pdp__thumb-photo" style={{ backgroundImage: `url(${v.src})` }} />
                ) : (
                  <window.ModuleRender product={product} color={color} molding={molding} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <span className="pdp__family">{product.family} · {product.ceiling || 'Plafond standard'}</span>
          <h1 className="pdp__name">{product.name}</h1>
          <div className="pdp__sku">SKU · {product.id} {product.corner && product.corner !== 'Non' ? '· Configuration ' + product.corner.toLowerCase() : ''}</div>

          <div className="pdp__price-row">
            <span className="pdp__price">${product.price.toLocaleString('fr-CA')} <span style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--font-sans)' }}>CAD</span></span>
            <span className="pdp__price-note">Prix module nu. Panneaux de finition, fillers et installation chiffrés à la soumission.</span>
          </div>

          <p className="pdp__lede">
            Caisson en contreplaqué, finition intérieure en placage de bouleau. Porte HDF avec moulure massive en bouleau. Quincaillerie Blum à fermeture amortie. Fini extérieur catalysé, assorti à la couleur sélectionnée.
          </p>

          <div className="pdp__option">
            <div className="pdp__option-head">
              <span className="pdp__option-label">Couleur</span>
              <span className="pdp__option-value">{color}</span>
            </div>
            <div className="pdp__colors">
              {COLORS_ALL.map(c => (
                <div key={c} className={'pdp__color ' + (color === c ? 'is-active' : '')} onClick={() => setColor(c)}>
                  <span className={'swatch-lg swatch--' + (c === 'Blanc Pur' ? 'blanc' : c === 'Chêne blanc' ? 'chene' : 'bleu')} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, lineHeight: 1.5 }}>{COLOR_DESC[color]}</p>
          </div>

          <div className="pdp__option">
            <div className="pdp__option-head">
              <span className="pdp__option-label">Moulure de porte</span>
              <span className="pdp__option-value">Shaker {molding}</span>
            </div>
            <div className="pdp__moldings">
              {['1 po', '3 po'].map(m => (
                <button key={m} className={'pdp__molding ' + (molding === m ? 'is-active' : '')} onClick={() => setMolding(m)}>
                  <strong>Shaker {m}</strong>
                  <span>{m === '1 po' ? 'Profil épuré, contemporain' : 'Profil large, classique éditorial'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__qty-row">
            <div className="qty-stepper">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <input value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className="btn btn--primary" style={{ flex: 1 }} onClick={handleAdd}>
              Ajouter au projet — ${(product.price * qty).toLocaleString('fr-CA')} <span className="arr">→</span>
            </button>
          </div>

          <div className="pdp__specs">
            <h4>Spécifications techniques</h4>
            <dl>
              <dt>Largeur</dt><dd>{product.w} po</dd>
              <dt>Profondeur</dt><dd>{product.d} po</dd>
              <dt>Hauteur</dt><dd>{product.h} po</dd>
              <dt>Plafond</dt><dd>{product.ceiling || '—'}</dd>
              <dt>Portes</dt><dd>{product.doors}</dd>
              <dt>Configuration</dt><dd>{product.corner === 'Non' || !product.corner ? 'Droite' : product.corner}</dd>
              <dt>Caisson</dt><dd>Contreplaqué 5/8″ · placage bouleau intérieur</dd>
              <dt>Porte</dt><dd>HDF + moulure bouleau massif</dd>
              <dt>Quincaillerie</dt><dd>Blum, fermeture amortie</dd>
              <dt>Garantie</dt><dd>10 ans caisson + quincaillerie</dd>
            </dl>
          </div>
        </div>
      </div>

      <section className="insitu">
        <div className="insitu__head">
          <span className="eyebrow eyebrow--accent">En situation</span>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em', marginTop: 12 }}>Le module, hors-catalogue.</h2>
        </div>
        <div className="insitu__grid">
          {inSitu.map((src, i) => (
            <figure key={i} className={'insitu__fig insitu__fig--' + i}>
              <div className="insitu__img" style={{ backgroundImage: `url(${src})` }} />
              <figcaption>
                <span className="num">FIG.{String(i + 1).padStart(2, '0')}</span>
                <span>{['Cuisine complète, Outremont', 'Détail moulure Shaker', 'Atelier — vérification finition'][i]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <div style={{ marginTop: 100, borderTop: '1px solid var(--line)', paddingTop: 56 }}>
          <h2 className="serif" style={{ fontSize: 32, letterSpacing: '-0.02em', marginBottom: 32 }}>De la même famille</h2>
          <div className="pgrid" style={{ '--cols': 4 }}>
            {related.map(p => <window.PCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

window.Produit = Produit;
