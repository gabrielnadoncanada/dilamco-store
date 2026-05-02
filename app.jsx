/* ============================================================
   Dilamco — App root + Tweaks
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "density": "comfy",
  "showPrices": true,
  "serif": "GT Sectra",
  "sans": "Söhne"
}/*EDITMODE-END*/;

function App() {
  const route = useRoute();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme
  useEffect(() => {
    document.body.dataset.theme = tweaks.theme === 'default' ? '' : tweaks.theme;
    document.body.dataset.density = tweaks.density;
    document.body.dataset.showPrices = String(tweaks.showPrices);
  }, [tweaks.theme, tweaks.density, tweaks.showPrices]);

  let page;
  const top = route.parts[0] || '';
  switch (top) {
    case '': page = <window.Home />; break;
    case 'catalogue': page = <window.Catalogue route={route} />; break;
    case 'produit': page = <window.Produit route={route} />; break;
    case 'soumission': page = <window.Soumission />; break;
    case 'savoir-faire': page = <window.SavoirFaire />; break;
    case 'projets': page = <window.Projets />; break;
    case 'collections': page = <window.Collections />; break;
    default: page = <window.Home />;
  }

  return (
    <div className="shell">
      <window.Topbar route={route} />
      <main>{page}</main>
      <window.Footer />
      <window.CartDrawer />
      <TweaksPanel title="Direction visuelle">
        <TweakSection title="Direction visuelle">
          <TweakRadio label="Palette" value={tweaks.theme} onChange={v => setTweak('theme', v)} options={[
            { value: 'default', label: 'Sapin' },
            { value: 'warm', label: 'Bois brûlé' },
            { value: 'ink', label: 'Encre' }
          ]} />
        </TweakSection>
        <TweakSection title="Catalogue">
          <TweakRadio label="Densité" value={tweaks.density} onChange={v => setTweak('density', v)} options={[
            { value: 'comfy', label: '3 col.' },
            { value: 'dense', label: '4 col.' }
          ]} />
          <TweakToggle label="Afficher les prix" value={tweaks.showPrices} onChange={v => setTweak('showPrices', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<window.CartProvider><App /></window.CartProvider>);
