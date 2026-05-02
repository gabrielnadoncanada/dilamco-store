/* ============================================================
   Dilamco — Pages: Savoir-faire, Projets, Collections (édito magazine)
   ============================================================ */

/* ------------------------------------------------------------
   SAVOIR-FAIRE
   ------------------------------------------------------------ */
function SavoirFaire() {
  return (
    <div className="sf">
      <header className="sf__hero">
        <div className="sf__hero-copy">
          <span className="eyebrow eyebrow--accent">Savoir-faire</span>
          <h1 className="serif sf__hero-title">Une chaîne courte,<br/>contrôlée,<br/><em>depuis vingt ans</em>.</h1>
          <p className="sf__hero-lede">
            Le marketing ne précède pas la réalité opérationnelle. Voici ce qui sépare nos modules de ce que vous trouverez ailleurs — concrètement, structurellement.
          </p>
        </div>
        <div className="sf__hero-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80)' }}>
          <span className="sf__hero-tag">Entrepôt Dilamco · Montréal · 3 200 m²</span>
        </div>
      </header>

      <section className="sf__pillars">
        {[
          { num: '01', t: 'L\'usine partenaire', b: 'Une seule usine. Un protocole de contrôle qualité que nous avons défini avec eux et que nous auditons en personne deux fois par an. Aucun panel de fournisseurs concurrents — la qualité ne se moyenne pas.', stat: '1 / 1', sl: 'Usine partenaire' },
          { num: '02', t: 'Le conteneur, pas le détaillant', b: 'Nous importons en direct, par conteneur dédié. Pas de marge de revendeur, pas de marketplace, pas de "drop-ship" depuis l\'autre bout du monde au moment où vous commandez.', stat: '12', sl: 'Conteneurs / an' },
          { num: '03', t: 'L\'entrepôt de Montréal', b: '3 200 m² de stock tampon, où chaque module est inspecté à réception avant d\'être marqué disponible. Si un panneau a voyagé mal, il ne quitte jamais l\'entrepôt.', stat: '3 200', sl: 'm² d\'entrepôt' },
          { num: '04', t: 'L\'équipe d\'installation', b: 'Notre propre équipe, salariée. Pas de sous-traitance. Le chef de projet qui vous a vendu le projet est celui qui le suit jusqu\'à la signature de réception.', stat: '0', sl: 'Sous-traitants' },
        ].map(p => (
          <article key={p.num} className="sf__pillar">
            <div className="sf__pillar-num">PILIER {p.num}</div>
            <h3 className="sf__pillar-title">{p.t}</h3>
            <p className="sf__pillar-body">{p.b}</p>
            <div className="sf__pillar-stat">
              <span className="num serif">{p.stat}</span>
              <span className="lbl">{p.sl}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="sf__quote-block">
        <p className="sf__quote-mark serif">“</p>
        <p className="sf__quote-text serif">
          Nous ne vendons pas une marque ; nous vendons<br/>
          <em>une logistique maîtrisée</em>, dont l'avantage se mesure<br/>
          en jours de chantier économisés.
        </p>
        <div className="sf__quote-author">
          <strong>Antoine Dilamco</strong><br/>
          <span className="mono">Fondateur · 2003</span>
        </div>
      </section>

      <section className="sf__visit">
        <div className="sf__visit-grid">
          <div className="sf__visit-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80)' }} />
          <div className="sf__visit-copy">
            <span className="eyebrow eyebrow--accent">Showroom Montréal</span>
            <h2 className="serif sf__visit-title">Voir, toucher,<br/>ouvrir, fermer.</h2>
            <p>5 200 pi² d'exposition au cœur du Mile-Ex. Trois cuisines complètes en démonstration, échantillons de tous les finis, tablette de mesure d'angle pour planifier votre projet en 90 minutes.</p>
            <div className="sf__visit-info">
              <div><span className="mono">Adresse</span><br/><strong>275 rue Beaubien Ouest, Montréal H2T 1S2</strong></div>
              <div><span className="mono">Sur rendez-vous</span><br/><strong>Lun – Ven · 9h à 17h</strong></div>
            </div>
            <a className="btn btn--primary" href="#/soumission" style={{ marginTop: 32 }}>Prendre rendez-vous <span className="arr">→</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------
   PROJETS — études de cas magazine
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    id: 'outremont',
    ville: 'Outremont',
    titre: 'Une cuisine d\'angle dans une maison de 1932.',
    annee: '2024',
    surface: '42 m²',
    budget: '58 000 $',
    duree: '11 jours',
    modules: 38,
    fini: 'Blanc Pur · Shaker 3 po',
    plafond: '9 pi',
    hero: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80',
    galerie: [
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556910638-7066ad26d4f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556910589-129022a4b1c4?auto=format&fit=crop&w=900&q=80',
    ],
    citation: 'Trois soumissions, trois déceptions. Dilamco a été le seul à nous remettre un prix ferme sous deux jours.',
    auteur: 'Mireille L. · propriétaire',
    architecte: 'Atelier Pierre Thibault',
  },
  {
    id: 'westmount',
    ville: 'Westmount',
    titre: 'Penthouse contemporain, îlot bleu marin.',
    annee: '2024',
    surface: '54 m²',
    budget: '78 000 $',
    duree: '14 jours',
    modules: 52,
    fini: 'Bleu marin + Blanc Pur · Shaker 1 po',
    plafond: '9 pi',
    hero: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
    galerie: [
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909211-36987daf7b4f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80',
    ],
    citation: 'Le bicolore est piégeux à exécuter. Le fait que tout vienne d\'une seule usine se sent au montage : zéro écart de teinte.',
    auteur: 'Jean-François D. · architecte',
    architecte: 'Naturehumaine',
  },
  {
    id: 'plateau',
    ville: 'Plateau Mont-Royal',
    titre: 'Triplex centenaire, cuisine en U compacte.',
    annee: '2023',
    surface: '28 m²',
    budget: '42 000 $',
    duree: '9 jours',
    modules: 24,
    fini: 'Chêne blanc · Shaker 1 po',
    plafond: '8 pi',
    hero: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=2000&q=80',
    galerie: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
    ],
    citation: 'Plafond 8 pi, donc on a poussé le mur jusqu\'au plafond. Le bouleau teinté chêne tient ses promesses sur la durée.',
    auteur: 'Sophie B. · designer d\'intérieur',
    architecte: 'la Shed Architecture',
  },
];

function Projets() {
  const [active, setActive] = React.useState(PROJECTS[0].id);
  const project = PROJECTS.find(p => p.id === active);

  return (
    <div className="proj">
      <header className="proj__hero">
        <span className="eyebrow eyebrow--accent">Projets réalisés</span>
        <h1 className="serif proj__hero-title">
          Du dessin<br/>
          <em>à la livraison.</em>
        </h1>
        <p className="proj__hero-lede">Trois études de cas — du triplex centenaire au penthouse contemporain. Mêmes modules au catalogue, mêmes 48h pour la soumission, des budgets de 42k à 78k.</p>
      </header>

      <nav className="proj__tabs">
        {PROJECTS.map((p, i) => (
          <button key={p.id} className={'proj__tab ' + (active === p.id ? 'is-active' : '')} onClick={() => setActive(p.id)}>
            <span className="mono">0{i + 1}</span>
            <span className="serif">{p.ville}</span>
            <span className="proj__tab-meta">{p.surface} · {p.budget}</span>
          </button>
        ))}
      </nav>

      <article key={project.id} className="proj__case">
        <div className="proj__case-hero" style={{ backgroundImage: `url(${project.hero})` }}>
          <div className="proj__case-tag">
            <span className="mono">CAS · {project.id.toUpperCase()}</span>
            <span className="mono">{project.annee}</span>
          </div>
        </div>

        <div className="proj__case-head">
          <div>
            <span className="eyebrow eyebrow--accent">{project.ville}</span>
            <h2 className="serif proj__case-title">{project.titre}</h2>
          </div>
          <div className="proj__case-meta-grid">
            <div><span className="mono">Surface</span><strong>{project.surface}</strong></div>
            <div><span className="mono">Budget final</span><strong>{project.budget}</strong></div>
            <div><span className="mono">Durée chantier</span><strong>{project.duree}</strong></div>
            <div><span className="mono">Modules</span><strong>{project.modules}</strong></div>
            <div><span className="mono">Fini</span><strong>{project.fini}</strong></div>
            <div><span className="mono">Plafond</span><strong>{project.plafond}</strong></div>
          </div>
        </div>

        <div className="proj__case-quote">
          <p className="serif">« {project.citation} »</p>
          <span className="mono">— {project.auteur} · architecte associé : {project.architecte}</span>
        </div>

        <div className="proj__case-gallery">
          <div className="proj__case-img proj__case-img--lg" style={{ backgroundImage: `url(${project.galerie[0]})` }} />
          <div className="proj__case-img" style={{ backgroundImage: `url(${project.galerie[1]})` }} />
          <div className="proj__case-img" style={{ backgroundImage: `url(${project.galerie[2]})` }} />
        </div>

        <div className="proj__case-foot">
          <a className="btn btn--primary" href="#/soumission">Démarrer un projet similaire <span className="arr">→</span></a>
          <a className="btn btn--ghost" href="#/catalogue">Voir les modules utilisés</a>
        </div>
      </article>

      <section className="proj__archive">
        <span className="eyebrow eyebrow--accent">Archive · 2018 — 2024</span>
        <div className="proj__archive-grid">
          {[
            { v: 'Île-des-Sœurs', m: '36 m²', b: '52k' },
            { v: 'Rosemont', m: '32 m²', b: '45k' },
            { v: 'Verdun', m: '38 m²', b: '49k' },
            { v: 'Hampstead', m: '48 m²', b: '68k' },
            { v: 'Mile-End', m: '24 m²', b: '34k' },
            { v: 'Saint-Lambert', m: '40 m²', b: '54k' },
            { v: 'NDG', m: '30 m²', b: '41k' },
            { v: 'Boucherville', m: '46 m²', b: '64k' },
          ].map((p, i) => (
            <div key={i} className="proj__archive-item">
              <span className="mono">0{(i + 4)}</span>
              <strong className="serif">{p.v}</strong>
              <span>{p.m} · {p.b}$</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------
   COLLECTIONS — pages d'ambiance riche
   ------------------------------------------------------------ */
const COLLECTIONS = [
  {
    id: 'blanc-pur',
    code: 'C.01',
    nom: 'Blanc Pur',
    sous: 'La référence neutre',
    desc: 'Plus de la moitié des projets Dilamco partent du Blanc Pur. Il s\'efface au profit de la lumière, du comptoir, de la pièce. Un blanc neutre légèrement chaud, catalysé deux couches.',
    matiere: 'Blanc opaque catalysé · Sheen 25%',
    rgb: 'NCS S 0500-N',
    veinage: 'Aucun',
    usage: 'Idéal en cuisine complète, ouverte sur séjour. Compatible avec tous les comptoirs (marbre, quartz, bois, acier).',
    ambient: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80',
    detail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    bgColor: '#f5f1e8',
    swColor: '#f3efe6',
    pourcentage: '54%',
    pourcentage_lbl: 'des projets 2024',
  },
  {
    id: 'chene-blanc',
    code: 'C.02',
    nom: 'Chêne blanc',
    sous: 'L\'élégance scandinave',
    desc: 'Placage bouleau teinté chêne. Le veinage horizontal, l\'élégance qu\'on demande sans pouvoir la nommer. Idéal en îlot ou mur d\'accent.',
    matiere: 'Placage bouleau · Teinture aqueuse · Vernis mat 10%',
    rgb: 'Pantone 7503 C (référence)',
    veinage: 'Horizontal continu',
    usage: 'Parfait sur îlot central, mur de garde-mangers, ou en bicolore avec Blanc Pur sur les hauts.',
    ambient: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=2000&q=80',
    detail: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80',
    bgColor: '#c9a56e',
    swColor: '#c9b48a',
    pourcentage: '31%',
    pourcentage_lbl: 'des projets 2024',
  },
  {
    id: 'bleu-marin',
    code: 'C.03',
    nom: 'Bleu marin',
    sous: 'L\'affirmation chromatique',
    desc: 'Un bleu profond catalysé. Pour les projets qui assument une couleur — souvent en bas, jumelé avec un haut Blanc Pur. Tient son ton sous lumière chaude comme froide.',
    matiere: 'Opaque catalysé · Sheen 25% · 4 couches',
    rgb: 'Farrow & Ball · Hague Blue (référence)',
    veinage: 'Aucun',
    usage: 'Tient le mieux en bas (armoires de bas + îlot). Évitez la cuisine entièrement bleue : la pièce devient lourde.',
    ambient: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
    detail: 'https://images.unsplash.com/photo-1556910589-129022a4b1c4?auto=format&fit=crop&w=1200&q=80',
    bgColor: '#1f3245',
    swColor: '#2a3d52',
    pourcentage: '15%',
    pourcentage_lbl: 'des projets 2024',
  },
];

function Collections() {
  return (
    <div className="coll">
      <header className="coll__hero">
        <span className="eyebrow eyebrow--accent">Collections 2026</span>
        <h1 className="serif coll__hero-title">Trois finis.<br/>Trois caractères.<br/><em>Une même rigueur.</em></h1>
        <p className="coll__hero-lede">
          Nous avons fait un choix : limiter la palette pour pousser la qualité. Trois finis Shaker, déclinés sur tous les modules du catalogue, contrôlés à l'usine sous le même protocole de teinte.
        </p>
      </header>

      {COLLECTIONS.map((c, i) => (
        <section key={c.id} className={'coll__feat ' + (i % 2 === 1 ? 'coll__feat--reverse' : '')}>
          <div className="coll__feat-img-wrap">
            <div className="coll__feat-img" style={{ backgroundImage: `url(${c.ambient})` }} />
            <div className="coll__feat-swatch" style={{ background: c.swColor }}>
              <span className="mono">{c.code}</span>
            </div>
          </div>

          <div className="coll__feat-copy">
            <span className="mono coll__feat-code">{c.code} · COLLECTION</span>
            <h2 className="serif coll__feat-title">{c.nom}</h2>
            <p className="coll__feat-sous serif">{c.sous}</p>
            <p className="coll__feat-desc">{c.desc}</p>

            <div className="coll__feat-spec">
              <div><span className="mono">Matière</span><strong>{c.matiere}</strong></div>
              <div><span className="mono">Référence</span><strong>{c.rgb}</strong></div>
              <div><span className="mono">Veinage</span><strong>{c.veinage}</strong></div>
            </div>

            <p className="coll__feat-usage">{c.usage}</p>

            <div className="coll__feat-stat">
              <span className="serif num">{c.pourcentage}</span>
              <span className="lbl">{c.pourcentage_lbl}</span>
            </div>

            <div className="coll__feat-cta">
              <a className="btn btn--primary" href={`#/catalogue?couleur=${encodeURIComponent(c.nom)}`}>Voir les {c.nom.toLowerCase()} <span className="arr">→</span></a>
              <a className="btn btn--ghost" href="#/soumission">Demander un échantillon</a>
            </div>
          </div>
        </section>
      ))}

      <section className="coll__compare">
        <span className="eyebrow eyebrow--accent">Comparer</span>
        <h2 className="serif coll__compare-title">Lequel pour votre projet ?</h2>
        <div className="coll__compare-table">
          <div className="coll__compare-head">
            <span></span>
            {COLLECTIONS.map(c => <span key={c.id} className="serif">{c.nom}</span>)}
          </div>
          {[
            ['Cuisine entière', 'Recommandé', 'Bon en îlot', 'À éviter'],
            ['Bicolore', 'Hauts', 'Îlot', 'Bas'],
            ['Plafond 8 pi', '✓', '✓', '✓ avec haut clair'],
            ['Plafond 9 pi', '✓', '✓', '✓'],
            ['Lumière nordique', '★', '★', '★'],
            ['Sud / chaud', '★', '★', '○ (bleu vire mat)'],
            ['Comptoir bois', '★', '○', '★'],
            ['Comptoir marbre', '★', '★', '★'],
          ].map((row, i) => (
            <div key={i} className="coll__compare-row">
              <span className="mono">{row[0]}</span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
              <span>{row[3]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

window.SavoirFaire = SavoirFaire;
window.Projets = Projets;
window.Collections = Collections;
