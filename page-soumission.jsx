/* ============================================================
   Dilamco — Page: Soumission (quote request)
   ============================================================ */

function Soumission() {
  const cart = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', tel: '', code_postal: '',
    type_projet: 'cuisine', budget: '40-60k', timeline: '3-6mois',
    notes: '',
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div style={{ maxWidth: 720, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <span className="eyebrow eyebrow--accent">Demande reçue</span>
        <h1 className="serif" style={{ fontSize: 56, letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: 16 }}>
          Votre soumission est en préparation.
        </h1>
        <p style={{ fontSize: 17, color: 'var(--muted)', marginTop: 24, lineHeight: 1.6 }}>
          Un chef de projet Dilamco vous rappelle au {form.tel || 'numéro fourni'} dans les 24 prochaines heures pour valider les dimensions. Vous recevrez votre soumission ferme par courriel sous 48h.
        </p>
        <div style={{ marginTop: 40 }}>
          <a className="btn btn--primary" href="#/" onClick={() => { cart.clear(); }}>Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  return (
    <div className="quote">
      <div className="quote__head">
        <span className="eyebrow eyebrow--accent">Demande de soumission</span>
        <h1>Votre projet, chiffré sous 48h.</h1>
        <p>Soumettez votre liste de modules et votre contexte. Un chef de projet vous contacte sous 24h pour planifier la prise de mesures, et vous recevez une soumission ferme — incluant panneaux, fillers, livraison et installation — sous 48h.</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); window.scrollTo(0, 0); }}>
        <div className="form-section">
          <div className="form-section__title">01 — Vos coordonnées</div>
          <div className="form-row">
            <div className="field"><label>Prénom</label><input required value={form.prenom} onChange={e => update('prenom', e.target.value)} /></div>
            <div className="field"><label>Nom</label><input required value={form.nom} onChange={e => update('nom', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Courriel</label><input required type="email" value={form.email} onChange={e => update('email', e.target.value)} /></div>
            <div className="field"><label>Téléphone</label><input required type="tel" value={form.tel} onChange={e => update('tel', e.target.value)} placeholder="514 555 0000" /></div>
          </div>
          <div className="form-row form-row--single">
            <div className="field"><label>Code postal de l'installation</label><input required value={form.code_postal} onChange={e => update('code_postal', e.target.value)} placeholder="H2T 1B5" /></div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section__title">02 — Le projet</div>
          <div className="form-row">
            <div className="field">
              <label>Type de projet</label>
              <select value={form.type_projet} onChange={e => update('type_projet', e.target.value)}>
                <option value="cuisine">Cuisine complète</option>
                <option value="renovation">Rénovation partielle</option>
                <option value="rangement">Rangement sur mesure</option>
                <option value="commercial">Projet commercial</option>
              </select>
            </div>
            <div className="field">
              <label>Échéancier souhaité</label>
              <select value={form.timeline} onChange={e => update('timeline', e.target.value)}>
                <option value="urgent">Sous 1 mois</option>
                <option value="1-3mois">1 à 3 mois</option>
                <option value="3-6mois">3 à 6 mois</option>
                <option value="6mois+">Plus de 6 mois</option>
              </select>
            </div>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>Budget approximatif</label>
            <div className="budget-grid">
              {['25-40k', '40-60k', '60-90k', '90k+'].map(b => (
                <label key={b}>
                  <input type="radio" name="budget" checked={form.budget === b} onChange={() => update('budget', b)} />
                  ${b}
                </label>
              ))}
            </div>
          </div>
          <div className="form-row form-row--single" style={{ marginTop: 18 }}>
            <div className="field">
              <label>Notes complémentaires (contexte, contraintes, inspirations)</label>
              <textarea value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Ex. cuisine en L, plafond 9 pi, projet de rénovation totale incluant îlot et garde-manger…" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn--primary" style={{ padding: '18px 36px', fontSize: 14 }}>
          Envoyer la demande <span className="arr">→</span>
        </button>
      </form>

      <aside className="quote__summary">
        <span className="eyebrow eyebrow--accent">Votre projet</span>
        <h3 style={{ marginTop: 8 }}>{cart.totalQty} module{cart.totalQty !== 1 ? 's' : ''} sélectionné{cart.totalQty !== 1 ? 's' : ''}</h3>
        {cart.items.length === 0 ? (
          <div style={{ padding: '24px 0', color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
            Vous pouvez soumettre la demande sans avoir encore choisi de modules — un chef de projet vous accompagnera dans la sélection.
            <div style={{ marginTop: 16 }}>
              <a className="btn btn--ghost btn--small" href="#/catalogue">Parcourir le catalogue</a>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="quote__summary-list">
              {cart.items.map(it => (
                <div key={it.key} className="quote__summary-item">
                  <span className="qty">{String(it.qty).padStart(2, '0')}×</span>
                  <span><span className="nm">{it.name}</span><br /><span className="opt">{it.color} · Shaker {it.molding}</span></span>
                  <span className="pr">${(it.price * it.qty).toLocaleString('fr-CA')}</span>
                </div>
              ))}
            </div>
            <div className="quote__summary-totals">
              <div className="quote__total-line"><span>Sous-total catalogue</span><span className="mono">${cart.subtotal.toLocaleString('fr-CA')}</span></div>
              <div className="quote__total-line"><span>Panneaux + fillers (est.)</span><span style={{ color: 'var(--muted)' }}>chiffrés</span></div>
              <div className="quote__total-line"><span>Livraison + installation</span><span style={{ color: 'var(--muted)' }}>chiffrés</span></div>
              <div className="quote__total-line quote__total-line--big"><span>Estimation modules</span><span>${cart.subtotal.toLocaleString('fr-CA')}</span></div>
            </div>
            <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginTop: 16 }}>
              Estimation indicative basée sur le catalogue technique. La soumission ferme inclut tous les éléments de finition, livraison et pose.
            </p>
          </React.Fragment>
        )}
      </aside>
    </div>
  );
}

window.Soumission = Soumission;
