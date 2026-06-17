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
   * lowercase-with-dashes and unique. `body` paragraphs render in the        *
   * reading view. Add as many entries as you like; the index scales.         */
  writing: [
    {
      slug: "selling-to-engineers",
      title: "Selling to engineers without selling",
      date: "2026-04-18",
      readingTime: "6 min",
      blurb: "The fastest way to lose a technical buyer is to sound like a brochure. What actually builds trust in the room.",
      body: [
        "Every engineer has a brochure-detector, and it fires the moment you reach for a superlative. \"Blazing fast.\" \"Enterprise-grade.\" \"Seamless.\" The words aren't the problem; the absence of substance behind them is. A technical buyer isn't resisting the sale — they're resisting being managed.",
        "The move that works is almost embarrassingly simple: be specific, and be willing to say what the product doesn't do. When I tell an engineer where our system has sharp edges, two things happen. They trust the parts I'm enthusiastic about, and they start co-designing the rollout with me instead of cross-examining it.",
        "Specificity is a form of respect. \"It handles load\" is a claim. \"It held 4,000 concurrent writes at p99 of 120ms until we hit the connection-pool ceiling, here's the graph\" is a conversation. The second one is also far more persuasive, because it sounds like something a peer would say, not something a quota would say.",
        "The paradox of selling to engineers is that the less you try to sell, the more you sell. Show your work, name the tradeoffs, and let the product's real shape do the closing."
      ]
    },
    {
      slug: "from-ic-to-quota",
      title: "From IC to quota: what I had to unlearn",
      date: "2026-02-09",
      readingTime: "5 min",
      blurb: "Moving from writing code to carrying a number rewired how I think about value, time, and being wrong.",
      body: [
        "As an engineer, being right was the whole job. Correctness was binary and the compiler was the judge. In go-to-market, correctness is a distribution, the judge is a human, and the feedback loop is measured in weeks. That adjustment was harder than any system I've built.",
        "The most useful thing I unlearned was the instinct to optimize for elegance. A clean solution nobody adopts is worth less than a clumsy one that ships value this quarter. Pipeline, like production, rewards the thing that works in front of real users — not the thing that's beautiful in your head.",
        "What carried over, though, was debugging. A stalled deal is a stack trace. Something upstream broke; the symptom is just where it surfaced. Learning to trace a 'we'll circle back' to its actual root cause is the same muscle as chasing a null pointer three layers down."
      ]
    },
    {
      slug: "demo-as-a-product",
      title: "Treat the demo like a product, not a performance",
      date: "2025-12-01",
      readingTime: "4 min",
      blurb: "The best demos aren't scripted theater. They're a small, honest product you build for one audience of one.",
      body: [
        "A demo that tries to show everything shows nothing. The instinct to cover the full feature set is the same instinct that produces bloated software — and it fails for the same reason: no one can hold all of it at once.",
        "I build a demo the way I'd build an MVP. One job, done well, for one specific person in the room. I find out what's actually keeping them up at night before the call, and I cut everything that doesn't speak to it. The result feels less like a presentation and more like a prototype of their solution.",
        "When the demo is a product, the buyer can imagine owning it. That shift — from watching to imagining ownership — is most of the sale."
      ]
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
