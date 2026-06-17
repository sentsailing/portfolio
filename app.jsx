/* ============================================================================
   APP.JSX  —  Shell: nav, hash router, theme system, Tweaks.
   ============================================================================ */
const { useState: useS, useEffect: useE } = React;

/* ---- Tweak defaults (design optionality lives here) ---- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "sidebar",
  "accent": "#1F8A5B",
  "serif": "Newsreader",
  "mono": "DM Mono"
} /*EDITMODE-END*/;

const MONO_STACKS = {
  "DM Mono": '"DM Mono", ui-monospace, Menlo, monospace',
  "JetBrains Mono": '"JetBrains Mono", ui-monospace, Menlo, monospace',
  "Space Mono": '"Space Mono", ui-monospace, Menlo, monospace',
  "IBM Plex Mono": '"IBM Plex Mono", ui-monospace, Menlo, monospace'
};

const SERIF_STACKS = {
  "Newsreader": '"Newsreader", Georgia, serif',
  "Spectral": '"Spectral", Georgia, serif',
  "Source Serif": '"Source Serif 4", Georgia, serif'
};

const THEMES = [
{ id: "accent", label: "Light", swatch: "#fbfbf9", bg: "#fbfbf9" },
{ id: "dark", label: "Dark", swatch: "#1d1c19", bg: "#1d1c19" }];


/* ---------------- routing ---------------- */
function parseHash() {
  let h = (location.hash || "").replace(/^#\/?/, "");
  if (!h) return { page: "about" };
  const parts = h.split("/");
  if (parts[0] === "writing" && parts[1]) return { page: "reading", slug: parts[1] };
  return { page: parts[0] || "about" };
}

const NAV = [
{ id: "about", label: "About", num: "01" },
{ id: "writing", label: "Writing", num: "02" },
{ id: "gallery", label: "Gallery", num: "03" }];


/* ---------------- theme ---------------- */
function getInitialTheme() {
  const saved = localStorage.getItem("dyw-theme");
  if (saved) return saved;
  // auto-detect on first load
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "accent";
}

/* ---------------- nav pieces ---------------- */
function NavLinks({ route, go }) {
  return (
    <nav className="nav">
      {NAV.map((n) =>
      <a key={n.id} href={`#/${n.id === "about" ? "" : n.id}`} className={"nav-link" + (route.page === n.id || n.id === "writing" && route.page === "reading" ? " active" : "")}
      onClick={(e) => {e.preventDefault();go(n.id === "about" ? "" : n.id);}}>
          <span className="num">{n.num}</span>
          <span className="label-full">{n.label}</span>
          <span className="dot" />
        </a>
      )}
    </nav>);

}

function ThemeSwitch({ theme, setTheme }) {
  return (
    <div className="theme-switch" role="group" aria-label="Color scheme">
      {THEMES.map((t) =>
      <button key={t.id} className="theme-dot" data-on={theme === t.id} title={t.label}
      aria-label={t.label} aria-pressed={theme === t.id}
      onClick={() => setTheme(t.id)}>
          <span className="swatch" style={{ background: t.swatch }} />
        </button>
      )}
    </div>);

}

function Sidebar({ route, go, theme, setTheme }) {
  const S = window.SITE;
  return (
    <aside className="sidebar">
      <a className="brand" href="#/" onClick={(e) => {e.preventDefault();go("");}}>
        <span className="brand-name">{S.name}</span>
        <span className="brand-tag"></span>
      </a>
      <NavLinks route={route} go={go} />
      <div className="side-foot">
        <ThemeSwitch theme={theme} setTheme={setTheme} />
        <div className="side-meta">
          {new Date().getFullYear()} · New York, NY<br />
          Open to entry level roles
        </div>
      </div>
    </aside>);

}

function Topbar({ route, go, theme, setTheme }) {
  const S = window.SITE;
  return (
    <header className="topbar">
      <a className="brand" href="#/" onClick={(e) => {e.preventDefault();go("");}}>
        <span className="brand-name">{S.name}</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <NavLinks route={route} go={go} />
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>
    </header>);

}

/* ---------------- root ---------------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useS(parseHash());
  const [theme, setThemeState] = useS(getInitialTheme());

  // hash routing
  useE(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (path) => {location.hash = "#/" + path;window.scrollTo(0, 0);};

  // apply theme to <html>
  useE(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dyw-theme", theme);
  }, [theme]);
  const setTheme = (id) => setThemeState(id);

  // apply layout + accent + serif (from tweaks)
  useE(() => {document.documentElement.setAttribute("data-layout", t.layout);}, [t.layout]);
  useE(() => {document.documentElement.style.setProperty("--accent-hue", t.accent);}, [t.accent]);
  useE(() => {document.documentElement.style.setProperty("--font-serif", SERIF_STACKS[t.serif] || SERIF_STACKS.Newsreader);}, [t.serif]);
  useE(() => {document.documentElement.style.setProperty("--font-mono", MONO_STACKS[t.mono] || MONO_STACKS["DM Mono"]);}, [t.mono]);

  let view;
  if (route.page === "writing") view = <Writing go={go} />;else
  if (route.page === "reading") view = <Reading slug={route.slug} go={go} />;else
  if (route.page === "gallery") view = <Gallery />;else
  view = <About go={go} />;

  return (
    <div className="app">
      <Sidebar route={route} go={go} theme={theme} setTheme={setTheme} />
      <Topbar route={route} go={go} theme={theme} setTheme={setTheme} />
      <main className="main">{view}</main>

      <TweaksPanel>
        <TweakSection label="Layout" />
        <TweakRadio label="Structure" value={t.layout}
        options={[{ value: "sidebar", label: "Sidebar" }, { value: "centered", label: "Centered" }]}
        onChange={(v) => setTweak("layout", v)} />

        <TweakSection label="Color scheme" />
        <TweakRadio label="Scheme" value={theme}
        options={[{ value: "accent", label: "Light" }, { value: "dark", label: "Dark" }]}
        onChange={(v) => setTheme(v)} />
        <TweakColor label="Accent" value={t.accent}
        options={["#1F8A5B", "#2A6FDB", "#C2613B", "#6E56CF", "#3C4250"]}
        onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Typeface" />
        <TweakRadio label="Display serif" value={t.serif}
        options={[{ value: "Newsreader", label: "Newsreader" }, { value: "Spectral", label: "Spectral" }, { value: "Source Serif", label: "Source" }]}
        onChange={(v) => setTweak("serif", v)} />
        <TweakSelect label="Mono / labels" value={t.mono}
        options={[{ value: "DM Mono", label: "DM Mono" }, { value: "JetBrains Mono", label: "JetBrains Mono" }, { value: "Space Mono", label: "Space Mono" }, { value: "IBM Plex Mono", label: "IBM Plex Mono" }]}
        onChange={(v) => setTweak("mono", v)} />
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);