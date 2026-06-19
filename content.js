/* ============================================================================
   CONTENT.JS  —  EDIT EVERYTHING HERE
   ----------------------------------------------------------------------------
   This is the only file you need to touch to update your site's content.
   Nothing here is layout code — just your words, links, and images.
   Save the file and refresh the page to see changes.
   ============================================================================ */

window.SITE = {

  /* --- IDENTITY ----------------------------------------------------------- */
  name: "David Y. Wang",

  // The one line under your name on the About page. Keep it to a sentence.
  positioning: "Engineer who sells. I talk to technical buyers as a peer — then help them buy.",

  // Short mono label that sits above your name (set to "" to hide).
  eyebrow: "Tech Sales · Sales Engineering · Solutions",

  /* --- BIO ---------------------------------------------------------------- *
   * Each string is its own paragraph. Lead with the "technical + sells"     *
   * angle. Keep it tight — two or three short paragraphs reads best.        */
  bio: [
    "Hello! I'm a UNC Chapel Hill graduate, where I studied Mathematics and Statistics. More recently, I built data pipelines for commercial real estate brokerages at Weirwood (YC W26).",
    "At Weirwood, I engineered data infrastructure: pipelines, scrapers, and agent harnesses that turned multimodal CRE data into queryable intelligence. This required a mixture of traditional scraping along with agent pipelines to extract structured fields. The tech stack ran on Python (Playwright, FastAPI), PostgreSQL, and Airflow orchestration on the OpenAI/Anthropic APIs, containerized with Docker on AWS. I also built a digital outreach engine, running structured A/B tests (across messaging, lead profiling, and timing) to systematically drive conversion.",
    "I'm currently interested in: effective agent harnesses, causal inference, product analytics, and probabilistic ML."
  ],

  // Optional one-liner shown as a small "currently" note (set to "" to hide).
  currently: "",

  /* --- HIGHLIGHTS / CREDENTIALS ------------------------------------------ *
   * label = the headline,  detail = the supporting line.                    */
  highlights: [
    { label: "Weirwood (YC W26)", detail: "Drove go-to-market initiatives alongside full-stack work at an early-stage Y Combinator company." },
    { label: "Full-stack rating-system app", detail: "Designed, built, and shipped a web app that grew to 300+ users." },
    { label: "UNC Chapel Hill — dual B.S.", detail: "Mathematics and Statistics & Analytics." },
    { label: "Lambda Phi Epsilon — Social Chair", detail: "Led events and member engagement for the UNC chapter." }
  ],

  /* --- CONTACT ------------------------------------------------------------ */
  contact: {
    email: "dyw.ventures@gmail.com",
    linkedin: "https://linkedin.com/in/sentsailing",
    // Optional extras — leave as "" to hide the link entirely.
    github: "",
    twitter: ""
  },

  // Résumé download. Drop your PDF at this path (same name) and it just works.
  resumeFile: "assets/David-Y-Wang-Resume.pdf",

  /* --- WRITING ------------------------------------------------------------ *
   * Newest first. `slug` is the URL id (#/writing/your-slug) — keep it       *
   * lowercase-with-dashes and unique.                                        *
   *                                                                          *
   * Two kinds of post, both work side by side:                              *
   *                                                                          *
   *  • MARKDOWN (best for long, rich writeups with images/tables/code):     *
   *      set `md: true`. Then create a folder:                              *
   *        writing/<slug>/index.md         ← the post (GitHub-flavored MD)  *
   *        writing/<slug>/images/*.png      ← reference as ](images/foo.png)*
   *      The reading view fetches + renders it lazily (parser loads only    *
   *      when someone opens the post, so the rest of the site stays fast).  *
   *                                                                          *
   *  • INLINE (quick text-only notes): give a `body: [ ...paragraphs ]`.    *
   *                                                                          *
   * To add a future writeup: drop a writing/<slug>/ folder and add one      *
   * entry below. That's it.                                                  */
  writing: [
    {
      slug: "glicko-puzzles",
      title: "Using ELO Systems as an Effective Problem Recommender for Education",
      date: "2026-06-19",
      readingTime: "10 min",
      blurb: "I built a math-practice app that rates both students and problems with one Glicko-2 system, turning recommendation into a two-sided rating problem. A full case study: the math, the engineering (built with Claude Code), what 5,697 attempts reveal about whether difficulty self-calibrates, and the brutal activation funnel behind a 1,279-signup launch.",
      md: true
    },
    {
      slug: "cookie-cats-retention-ab-test",
      title: "When “Significant” Isn’t the Whole Story: An A/B Test on Mobile-Game Retention",
      date: "2026-06-17",
      readingTime: "12 min",
      blurb: "A product-analytics walkthrough of the Cookie Cats gate experiment — from exploratory data analysis to a ship/no-ship decision, including the segmentation twist that the headline number hides.",
      md: true
    }
  ],

  /* --- PHOTO GALLERY ------------------------------------------------------ *
   * Shows ONE random photo at a time. To use your own photos:                *
   *   1. Drop image files into the /assets/gallery/ folder.                  *
   *   2. Replace the `src` paths below (and `alt` text).                     *
   * Any web image size works; the frame adapts to portrait or landscape.     */
  gallery: [
    { src: "assets/gallery/photo-1.svg", alt: "Placeholder — replace with your photo" },
    { src: "assets/gallery/photo-2.svg", alt: "Placeholder — replace with your photo" },
    { src: "assets/gallery/photo-3.svg", alt: "Placeholder — replace with your photo" },
    { src: "assets/gallery/photo-4.svg", alt: "Placeholder — replace with your photo" },
    { src: "assets/gallery/photo-5.svg", alt: "Placeholder — replace with your photo" },
    { src: "assets/gallery/photo-6.svg", alt: "Placeholder — replace with your photo" }
  ]
};
