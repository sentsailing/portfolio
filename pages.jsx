/* ============================================================================
   PAGES.JSX  —  About, Writing (index + reading), Gallery.
   Layout/markup only; all words & images come from window.SITE (content.js).
   ============================================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- tiny inline icon set (kept minimal & monoline) ---- */
const Icon = {
  mail: (p) => <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  linkedin: (p) => <svg className="ico" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9V9Z" /></svg>,
  github: (p) => <svg className="ico" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>,
  twitter: (p) => <svg className="ico" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.9 3H22l-7.4 8.46L23 21h-6.8l-5.3-6.93L4.8 21H1.7l7.9-9.03L1 3h6.97l4.8 6.34L18.9 3Zm-1.2 16h1.9L7.4 4.9H5.4L17.7 19Z" /></svg>,
  download: (p) => <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M5 20h14" /></svg>,
  shuffle: (p) => <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="15" height="15" {...p}><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="M4 4l5 5" /></svg>,
  arrow: (p) => <span aria-hidden="true" {...p}>→</span>
};


/* ---- Markdown posts ----------------------------------------------------- *
 * Long writeups live as writing/<slug>/index.md (+ images/). The parser and
 * the file are fetched ONLY when a reader opens a markdown post, so the rest
 * of the site never pays for them. Parsed HTML is cached per slug.          */
const MD_PARSER_SRC = "https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js";
let _markedPromise = null;
function ensureMarked() {
  if (window.marked) return Promise.resolve(window.marked);
  if (_markedPromise) return _markedPromise;
  _markedPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = MD_PARSER_SRC;s.async = true;
    s.onload = () => resolve(window.marked);
    s.onerror = () => {_markedPromise = null;reject(new Error("markdown parser failed to load"));};
    document.head.appendChild(s);
  });
  return _markedPromise;
}
function stripFrontmatter(md) {
  if (md.slice(0, 3) === "---") {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) {const nl = md.indexOf("\n", end + 1);return nl === -1 ? "" : md.slice(nl + 1);}
  }
  return md;
}
const _postCache = {};
function loadMarkdownPost(slug) {
  if (_postCache[slug]) return Promise.resolve(_postCache[slug]);
  const base = "writing/" + slug + "/";
  return Promise.all([
  ensureMarked(),
  fetch(base + "index.md").then((r) => {if (!r.ok) throw new Error("post not found");return r.text();})]).
  then(([marked, raw]) => {
    // rewrite relative image paths (images/foo.png) to the post's own folder
    const body = stripFrontmatter(raw).replace(/\]\(images\//g, "](" + base + "images/");
    const parse = marked.parse || marked;
    const html = parse(body).
    // defer offscreen charts so they don't block the reading experience
    replace(/<img /g, '<img loading="lazy" decoding="async" ').
    // wrap tables so wide ones scroll instead of breaking the layout
    replace(/<table>/g, '<div class="md-table"><table>').replace(/<\/table>/g, "</table></div>");
    _postCache[slug] = html;
    return html;
  });
}

/* hook: reveal children on scroll — with a guaranteed fallback so content
   ALWAYS becomes visible even if IntersectionObserver/rAF is throttled. */
function useReveals(dep) {
  useEffect(() => {
    // page-level entrance: toggle .entered on the page root
    const page = document.querySelector(".page-anim:not(.entered)");
    if (page) {requestAnimationFrame(() => page.classList.add("entered"));setTimeout(() => page.classList.add("entered"), 80);}

    const els = Array.from(document.querySelectorAll(".reveal:not(.in)"));
    const revealAll = () => els.forEach((e) => e.classList.add("in"));
    if (!("IntersectionObserver" in window)) {revealAll();return;}
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {if (en.isIntersecting) {en.target.classList.add("in");io.unobserve(en.target);}});
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((e, i) => {e.style.transitionDelay = Math.min(i * 70, 420) + "ms";io.observe(e);});
    // Fallback: guarantee everything is visible shortly after mount.
    const t = setTimeout(() => {revealAll();io.disconnect();}, 1400);
    return () => {clearTimeout(t);io.disconnect();};
  }, [dep]);
}

/* =========================================================================
   ABOUT
   ========================================================================= */
function About({ go }) {
  const S = window.SITE;
  useReveals("about");
  const c = S.contact;
  return (
    <div className="page page-anim">
      <h1 className="hero-name reveal">Who I am</h1>

      <section className="section">
        <div className="section-label reveal"><span>Bio</span><span className="sec-no">§1</span></div>
        <div className="prose">
          {S.bio.map((p, i) => <p key={i} className="reveal">{p}</p>)}
          {S.currently && <p className="reveal" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)", fontSize: 14 }}>Currently — {S.currently}</p>}
        </div>
      </section>

      <section className="section">
        <div className="section-label reveal"><span>Contact</span><span className="sec-no">§2</span></div>
        <div className="contact-row reveal">
          <a className="btn btn-primary" href={`mailto:${c.email}`}><Icon.mail /> {c.email}</a>
          {c.linkedin && <a className="btn" href={c.linkedin} target="_blank" rel="noopener"><Icon.linkedin /> LinkedIn</a>}
          {c.github && <a className="btn" href={c.github} target="_blank" rel="noopener"><Icon.github /> GitHub</a>}
          {c.twitter && <a className="btn" href={c.twitter} target="_blank" rel="noopener"><Icon.twitter /> X</a>}
        </div>
      </section>
    </div>);

}

/* =========================================================================
   WRITING — index
   ========================================================================= */
function Writing({ go }) {
  const S = window.SITE;
  useReveals("writing");
  return (
    <div className="page page-anim">
      <h1 className="hero-name reveal" style={{ fontSize: "clamp(34px,5vw,48px)", marginBottom: 0 }}>Notes</h1>

      <section className="section" style={{ marginTop: "clamp(32px,5vh,52px)" }}>
        <div className="writing-list">
          {S.writing.map((w) =>
          <a key={w.slug} className="entry reveal" href={`#/writing/${w.slug}`}
          onClick={(e) => {e.preventDefault();go(`writing/${w.slug}`);}}>
              <span className="entry-title">{w.title}</span>
              <p className="entry-blurb">{w.blurb}</p>
              <span className="entry-arrow">Read <Icon.arrow /></span>
            </a>
          )}
        </div>
      </section>
    </div>);

}

/* WRITING — reading view */
function Reading({ slug, go }) {
  const S = window.SITE;
  const w = S.writing.find((x) => x.slug === slug);
  const [mdHtml, setMdHtml] = useState("");
  const [mdState, setMdState] = useState("idle"); // idle | loading | ready | error
  useReveals("read-" + slug);
  useEffect(() => {window.scrollTo(0, 0);}, [slug]);

  // markdown-backed posts: fetch + render lazily
  useEffect(() => {
    if (!w || !w.md) return;
    let cancelled = false;
    setMdState("loading");setMdHtml("");
    loadMarkdownPost(w.slug).
    then((html) => {if (!cancelled) {setMdHtml(html);setMdState("ready");}}).
    catch(() => {if (!cancelled) setMdState("error");});
    return () => {cancelled = true;};
  }, [slug]);

  if (!w) {
    return (
      <div className="page page-anim reading">
        <a className="back" href="#/writing" onClick={(e) => {e.preventDefault();go("writing");}}>← Writing</a>
        <h1>Not found</h1>
        <p className="reading-body">That piece doesn’t exist. <a className="link" href="#/writing" onClick={(e) => {e.preventDefault();go("writing");}}>Back to all writing.</a></p>
      </div>);

  }
  return (
    <div className="page page-anim reading">
      <a className="back" href="#/writing" onClick={(e) => {e.preventDefault();go("writing");}}>← Writing</a>
      <h1 className="reveal">{w.title}</h1>
      {w.md ?
      mdState === "ready" ?
      <div className="reading-body md" dangerouslySetInnerHTML={{ __html: mdHtml }} /> :
      mdState === "error" ?
      <div className="reading-body"><p>Couldn’t load this piece. <a className="link" href="#/writing" onClick={(e) => {e.preventDefault();go("writing");}}>Back to all writing.</a></p></div> :
      <div className="reading-body"><p className="md-loading">Loading…</p></div> :

      <div className="reading-body">
        {w.body.map((p, i) => <p key={i} className="reveal">{p}</p>)}
      </div>}
    </div>);

}

/* =========================================================================
   GALLERY — one random photo, crossfade between
   ========================================================================= */
function Gallery() {
  const S = window.SITE;
  const photos = S.gallery || [];
  const [idx, setIdx] = useState(() => photos.length ? Math.floor(Math.random() * photos.length) : 0);
  const [shown, setShown] = useState(true);
  const lockRef = useRef(false);

  const advance = useCallback(() => {
    if (lockRef.current || photos.length < 2) return;
    lockRef.current = true;
    setShown(false); // fade current out
    setTimeout(() => {
      setIdx((prev) => {
        let n = prev;
        while (n === prev) n = Math.floor(Math.random() * photos.length);
        return n;
      });
      setShown(true); // fade next in
      setTimeout(() => {lockRef.current = false;}, 700);
    }, 360);
  }, [photos.length]);

  // keyboard: arrow / space advances
  useEffect(() => {
    const onKey = (e) => {if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === " ") {e.preventDefault();advance();}};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  useReveals("gallery");
  const cur = photos[idx] || {};

  return (
    <div className="page page-anim gallery">
      <h1 className="hero-name reveal" style={{ fontSize: "clamp(34px,5vw,48px)", marginBottom: 34 }}>Off the clock</h1>

      <div className="gframe reveal" onClick={advance} role="button" tabIndex={0}
      aria-label="Show another photo"
      onKeyDown={(e) => {if (e.key === "Enter") {advance();}}}>
        <img key={idx} className={shown ? "show" : ""} src={cur.src} alt={cur.alt || ""}
        onError={(e) => {e.currentTarget.style.display = 'none';}} />
      </div>

      <div className="gbar reveal">
        <button className="gnext" onClick={advance}><Icon.shuffle /> Shuffle</button>
      </div>
    </div>);

}

Object.assign(window, { About, Writing, Reading, Gallery, Icon });