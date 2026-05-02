/* ============================================================
   Dilamco — Page: Home
   ============================================================ */

const HERO_IMG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80';
const CAT_IMG_MURALE = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80';
const CAT_IMG_BAS = 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80';
const CAT_IMG_PANTRY = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80';
const CAT_IMG_COIN = 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=80';

function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Marquee />
      <Pillars />
      <Categories />
      <Process />
      <Testimonial />
      <Trust />
    </React.Fragment>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <span className="hero__crumb">CAT.2026 — DISTRIBUTION PREMIUM · MONTRÉAL</span>
        <h1 className="display hero__title">
          L'armoire,<br />
          comme <em>œuvre</em><br />
          de précision.
        </h1>
        <p className="hero__lede">
          Distribution exclusive d'armoires sur mesure issues d'une seule usine partenaire. Contreplaqué, bouleau massif, finition Shaker — livré et installé clé en main au Québec.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#/catalogue">Voir le catalogue <span className="arr">→</span></a>
          <a className="btn btn--ghost" href="#/soumission">Demander une soumission</a>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__photo" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="hero__caption">
          <span className="num">217</span>
          <span className="lbl">modules au catalogue, trois finis Shaker, déclinés en plafonds 8 et 9 pieds.</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__item"><span className="dot"></span>Entrepôt local 20+ ans</div>
      <div className="marquee__item"><span className="dot"></span>Usine partenaire exclusive</div>
      <div className="marquee__item"><span className="dot"></span>Contreplaqué + bouleau massif</div>
      <div className="marquee__item"><span className="dot"></span>Soumission sous 48h</div>
      <div className="marquee__item"><span className="dot"></span>Installation clé en main</div>
    </div>
  );
}

const PILLARS = [
  { num: '01', title: 'Une seule usine. Vingt ans de relation.', body: 'Pas de marketplace, pas de revendeurs intermédiaires. Chaque module quitte une usine partenaire avec laquelle nous opérons en exclusivité — la qualité ne se négocie pas par lot.' },
  { num: '02', title: 'Stock à Montréal, sans compromis.', body: 'Un entrepôt local depuis plus de deux décennies. Nous absorbons les délais maritimes pour vous : votre cuisine n\'attend ni un conteneur, ni une fluctuation de change.' },
  { num: '03', title: 'Contreplaqué. Bouleau. Aucun panneau aggloméré.', body: 'Caisson en contreplaqué, finition intérieure en placage de bouleau, porte HDF avec moulure massive. Les matériaux justifient le positionnement, pas l\'inverse.' },
  { num: '04', title: 'Du dessin à la dernière vis.', body: 'Design, fabrication, livraison, installation — un seul interlocuteur, une seule responsabilité. Le client ne joue pas au chef de chantier.' },
];

function Pillars() {
  return (
    <section className="pillars">
      <div className="pillars__head">
        <div>
          <span className="eyebrow eyebrow--accent">Pourquoi Dilamco</span>
          <h2 className="section" style={{ marginTop: 12 }}>Quatre certitudes structurelles.</h2>
        </div>
        <p>Notre avantage n'est pas un argument marketing. Il repose sur une chaîne d'approvisionnement que nous contrôlons de bout en bout — du choix du bois jusqu'à l'ajustement final dans votre cuisine.</p>
      </div>
      <div className="pillars__grid">
        {PILLARS.map(p => (
          <div key={p.num} className="pillar">
            <div className="pillar__num">PILIER {p.num}</div>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__body">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="cats">
      <div className="cats__head">
        <div>
          <span className="eyebrow eyebrow--accent">Le catalogue</span>
          <h2 className="section" style={{ marginTop: 12 }}>Sept familles. Trois finis. Une logique.</h2>
        </div>
        <a className="btn btn--ghost" href="#/catalogue">Tout parcourir <span className="arr">→</span></a>
      </div>
      <div className="cats__grid">
        <CatCard featured img={CAT_IMG_MURALE} count={210} title="Armoires murales" href="#/catalogue?famille=Armoire+murale" />
        <CatCard img={CAT_IMG_BAS} count={70} title="Armoires de bas" href="#/catalogue?famille=Armoire+de+bas" />
        <CatCard img={CAT_IMG_PANTRY} count={138} title="Garde-manger" href="#/catalogue?famille=Garde-manger" />
        <CatCard img={CAT_IMG_COIN} count={277} title="Modules de coin" href="#/catalogue?coin=oui" />
        <CatCard img={CAT_IMG_MURALE} count={36} title="Au-dessus du frigo" href="#/catalogue?famille=Armoire+au-dessus+du+r%C3%A9frig%C3%A9rateur" />
      </div>
    </section>
  );
}

function CatCard({ featured, img, count, title, href }) {
  return (
    <a className={'cat ' + (featured ? 'cat--featured' : '')} href={href}>
      <div className="cat__img" style={{ backgroundImage: `url(${img})` }} />
      <div className="cat__overlay" />
      <div className="cat__content">
        <div className="cat__count">{String(count).padStart(3, '0')} MODULES</div>
        <h3 className="cat__title">{title}</h3>
        <span className="cat__cta">Explorer la famille <span>→</span></span>
      </div>
    </a>
  );
}

const STEPS = [
  { num: '01', title: 'Premier appel', body: '20 minutes pour cerner votre projet, votre budget, vos contraintes. Aucun engagement.' },
  { num: '02', title: 'Mesures + dessins', body: 'Visite à domicile, plans 2D + rendus 3D, choix des modules et finis Shaker.' },
  { num: '03', title: 'Soumission ferme', body: 'Prix final sous 48h, incluant panneaux, fillers, livraison et installation.' },
  { num: '04', title: 'Pose en 1 à 3 jours', body: 'Notre équipe d\'installation, jamais sous-traitée. Garantie 10 ans sur les caissons.' },
];

function Process() {
  return (
    <section className="process">
      <div className="process__head">
        <span className="eyebrow eyebrow--accent">Le processus</span>
        <h2 style={{ marginTop: 12 }}>Quatre étapes. Aucun intermédiaire. Un seul chef de projet pour vous accompagner.</h2>
      </div>
      <div className="process__steps">
        {STEPS.map(s => (
          <div key={s.num} className="process__step">
            <div className="num">ÉTAPE {s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="testimonial">
      <p className="testimonial__quote">
        « Trois soumissions, trois déceptions. Dilamco a été le seul à nous remettre un prix ferme sous deux jours, et le seul à livrer exactement ce qui avait été dessiné. »
      </p>
      <div className="testimonial__author">Mireille L. · Outremont · Cuisine 42 m²</div>
    </section>
  );
}

function Trust() {
  return (
    <section className="trust">
      <div className="trust__inner">
        <div className="trust__lead">
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>La structure derrière le produit</span>
          <h2 style={{ marginTop: 12 }}>Le marketing reflète la réalité opérationnelle. Pas l'inverse.</h2>
          <p>Si la qualité n'est pas réelle, le positionnement premium s'effondre. Notre modèle repose sur quatre actifs concrets — pas sur une promesse.</p>
          <a className="btn btn--paper" style={{ marginTop: 32 }} href="#/savoir-faire">Visiter l'entrepôt <span className="arr">→</span></a>
        </div>
        <div className="trust__stats">
          <div className="trust__stat"><div className="num">20+</div><div className="lbl">Années d'opération continue à Montréal</div></div>
          <div className="trust__stat"><div className="num">217</div><div className="lbl">Modules standards au catalogue, sur mesure réel</div></div>
          <div className="trust__stat"><div className="num">48h</div><div className="lbl">Délai garanti pour une soumission ferme</div></div>
          <div className="trust__stat"><div className="num">10 ans</div><div className="lbl">Garantie complète sur les caissons et la quincaillerie</div></div>
        </div>
      </div>
    </section>
  );
}

window.Home = Home;
