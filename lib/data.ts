/* ------------------------------------------------------------------ */
/* AstolixGen — central content store.                                   */
/* All site copy lives here as typed data; pages render from it.        */
/* Static generation everywhere: no database, no CMS, no backend.       */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://astolixgen.com";

export const company = {
  name: "AstolixGen",
  tagline: "AI, Automation & Digital Solutions",
  heroHeadline: "AI. Automation. Software. IoT.",
  heroSubhead:
    "We build intelligent digital systems that connect AI, automation, software and the physical world.",
  primaryCta: "Tell us what you want to automate",
  heroSecondaryCta: "Explore our capabilities",
  phone: "+92 349 2223336",
  email: "astolixgen@gmail.com",
  location: "Karachi, Pakistan",
  socials: {
    linkedin: "https://linkedin.com/in/asif-ali-a1879a2ba",
    github: "https://github.com/asifaliattari",
    youtube: "https://youtube.com/@astolixgen",
  },
};

export const founder = {
  name: "Asif Ali",
  role: "Founder & CEO, AstolixGen",
  location: "Karachi, Pakistan",
  bio: [
    "Asif Ali is the Founder & CEO of AstolixGen and co-founder of BlackInkMotion. With 22+ years in IT and technical operations — including service in high-responsibility, mission-critical environments — he brings a rare mix of disciplined operations experience and hands-on modern technology skills.",
    "His work spans AI solutions, business automation, software development, data analytics and IoT concepts. At AstolixGen he focuses on practical, working systems: AI assistants that answer from your own documents, automations that remove repetitive work, dashboards that turn raw data into decisions, and IoT concepts that connect software to the physical world.",
    "Asif is a Karachi City Hackathon winner and a recipient of the Tamgha-i-Khidmat, a distinguished service medal awarded by the Government of Pakistan.",
  ],
  certifications: [
    "Google Data Analytics",
    "Agentic AI Developer",
    "Google Build With AI",
    "Cisco Networking Academy",
  ],
  achievements: [
    "Tamgha-i-Khidmat — Distinguished Service Medal, Government of Pakistan",
    "Karachi City Hackathon — Winner",
    "Google Local Guide — Level 7",
  ],
  cofounders: ["Taha Ahmed", "Ishtiaq Khan", "Sharmeen Asif"],
};

/* ------------------------------- Services ------------------------------- */

export interface Service {
  slug: string;
  name: string;
  short: string; // one-line summary for cards
  description: string[]; // detail-page paragraphs
  offerings: string[];
  useCases: { title: string; detail: string }[];
}

export const services: Service[] = [
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    short: "Practical AI systems — assistants, knowledge search and computer vision.",
    description: [
      "We design AI solutions around real business problems, not demos. From assistants that answer questions using your own documents to computer-vision systems that watch and interpret the physical world, every build is scoped, tested and documented.",
      "We work with modern large language models and retrieval techniques, and we prototype fast so you can see working software early — before committing to a full build.",
    ],
    offerings: [
      "AI assistants for customer support and internal teams",
      "RAG / knowledge assistants that answer from your documents",
      "Computer vision prototypes (detection, counting, monitoring)",
      "AI research & proof-of-concept prototypes",
    ],
    useCases: [
      {
        title: "Document Q&A assistant",
        detail:
          "Upload company manuals, policies or product docs; staff and customers ask questions in plain language and get grounded answers with sources.",
      },
      {
        title: "Visual monitoring prototype",
        detail:
          "Camera-based counting or presence detection for operations, safety or retail analytics — validated as a prototype before any hardware investment.",
      },
    ],
  },
  {
    slug: "ai-automation-agents",
    name: "AI Automation & Agents",
    short: "AI agents and workflow automation that remove repetitive work.",
    description: [
      "Repetitive work is where businesses quietly lose time and money. We connect your tools — WhatsApp, Gmail, Google Sheets, CRMs — with AI agents and automation workflows (including n8n) so routine tasks run themselves and your team handles the exceptions.",
      "Every automation is mapped to a measurable outcome: hours saved, faster response times, or leads that never slip through the cracks.",
    ],
    offerings: [
      "AI agents for lead qualification, FAQs and follow-ups",
      "n8n workflow automation across your apps",
      "WhatsApp business automation (replies, bookings, broadcasts)",
      "Business process automation & integration audits",
    ],
    useCases: [
      {
        title: "WhatsApp lead handling",
        detail:
          "New inquiries get an instant AI reply, are qualified with a few questions, and land in your Google Sheet or CRM — day or night.",
      },
      {
        title: "Back-office workflow automation",
        detail:
          "Invoices, reports and notifications generated automatically from the data you already collect, using n8n pipelines you can inspect and extend.",
      },
    ],
  },
  {
    slug: "software-web-development",
    name: "Software & Web Development",
    short: "Fast, modern websites and web applications built with Next.js.",
    description: [
      "We build websites and web applications with modern tooling — primarily Next.js and TypeScript — engineered for speed, SEO and maintainability. No bloated page builders, no mystery plugins: clean code you (or any developer) can extend.",
      "From company websites to custom dashboards and internal tools, we ship responsive, production-ready software.",
    ],
    offerings: [
      "Business websites (fast, SEO-friendly, mobile-first)",
      "Next.js web applications",
      "Custom web applications & internal tools",
      "Dashboards and admin panels",
    ],
    useCases: [
      {
        title: "Company website rebuild",
        detail:
          "Replace a slow template site with a fast Next.js site that loads in under two seconds and ranks better on search.",
      },
      {
        title: "Operations dashboard",
        detail:
          "A single live view of sales, inventory or service tickets — replacing scattered spreadsheets and manual reports.",
      },
    ],
  },
  {
    slug: "data-analytics",
    name: "Data & Analytics",
    short: "From messy spreadsheets to dashboards and reporting systems.",
    description: [
      "Most small businesses already have the data they need — it's trapped in spreadsheets, inboxes and disconnected tools. We clean it, structure it and turn it into dashboards and automated reports that decision-makers actually open.",
      "Our analytics work is practical: Google Sheets automation for teams that live in Sheets, and proper dashboards when you outgrow them.",
    ],
    offerings: [
      "Data analysis & cleanup",
      "Google Sheets automation (formulas, scripts, pipelines)",
      "Business dashboards (KPIs, sales, operations)",
      "Automated reporting systems",
    ],
    useCases: [
      {
        title: "Weekly reporting on autopilot",
        detail:
          "Raw sales or operations data flows into a clean dashboard and a Monday-morning summary email — no manual Excel work.",
      },
      {
        title: "Sheets-to-dashboard migration",
        detail:
          "Keep entering data in the Sheets your team knows; we pipe it into live charts and alerts automatically.",
      },
    ],
  },
  {
    slug: "iot-solutions",
    name: "IoT Solutions",
    short: "Sensor-based monitoring that connects software to the physical world.",
    description: [
      "IoT is where our software meets the real world. We design sensor-based monitoring concepts and dashboards — measuring things like temperature, humidity, soil conditions or air quality — and stream that data into alerts and AI-assisted insights.",
      "Our current focus is R&D: smart-agriculture monitoring concepts and indoor air-quality monitoring, built as working prototypes you can evaluate before scaling.",
    ],
    offerings: [
      "Sensor-based monitoring concepts & prototypes",
      "Smart agriculture monitoring concepts",
      "Indoor air-quality monitoring concepts",
      "IoT dashboards, alerts and data pipelines",
    ],
    useCases: [
      {
        title: "Smart agriculture monitoring",
        detail:
          "Soil and environment sensors stream field conditions to a dashboard, with AI-assisted notes on irrigation timing and crop stress signals.",
      },
      {
        title: "Indoor air-quality monitoring",
        detail:
          "Continuous tracking of key air-quality indicators in offices or classrooms, with alerts when thresholds are crossed.",
      },
    ],
  },
  {
    slug: "ai-creative-studio",
    name: "AI Creative Studio",
    short: "AI-assisted video, animation and brand content.",
    description: [
      "Through our creative arm, we produce AI-assisted video, 2D animation and brand films — combining generative media tools with human direction and editing. The result is professional content at a fraction of traditional production cost and time.",
      "From product explainers to social media content pipelines, we help brands publish consistently without a full studio budget.",
    ],
    offerings: [
      "AI-generated video & brand films",
      "AI 2D animation & motion graphics",
      "Product explainers",
      "Social media content production",
    ],
    useCases: [
      {
        title: "Product explainer video",
        detail:
          "A 60–90 second AI-assisted explainer that shows what your product does — script, visuals, voiceover and edit included.",
      },
      {
        title: "Content pipeline for social",
        detail:
          "A repeatable monthly workflow that turns your updates and offers into polished short-form video content.",
      },
    ],
  },
  {
    slug: "ai-education-training",
    name: "AI Education & Training",
    short: "Practical AI workshops for teams, companies and schools.",
    description: [
      "AI only pays off when people know how to use it. We run hands-on workshops and training programs — for corporate teams adopting AI tools, and for schools and teachers building AI literacy the right way.",
      "Every session is practical: real tools, real workflows, and exercises matched to what participants actually do day to day.",
    ],
    offerings: [
      "AI workshops (foundations to applied)",
      "Corporate AI training & adoption programs",
      "School & teacher AI training",
      "AI awareness programs",
    ],
    useCases: [
      {
        title: "Team AI onboarding",
        detail:
          "A one- or two-day workshop that takes a non-technical team from curious to confidently using AI in their daily work.",
      },
      {
        title: "Teacher training program",
        detail:
          "Practical sessions helping educators use AI for lesson planning, assessment support and classroom administration.",
      },
    ],
  },
];

/* ------------------------------- Projects ------------------------------- */

export interface Project {
  slug: string;
  title: string;
  status: string; // honest label: Concept / Prototype / R&D Concept
  summary: string;
  body: string[];
  tags: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: "agrisense-iot-concept",
    title: "AgriSense IoT Concept",
    status: "R&D Concept",
    summary:
      "An AI + IoT agriculture and environment monitoring concept: sensor-based field monitoring with AI-assisted insights.",
    body: [
      "AgriSense is our in-house research concept exploring how low-cost sensors and AI can support smarter farming. The concept pairs field sensors — tracking soil and environmental conditions — with a dashboard that turns raw readings into plain-language guidance.",
      "The goal is practical: help growers see what's happening in their fields without walking every row, and flag early signs of stress such as irrigation needs. This is active R&D, not a finished commercial product — we're validating the concept step by step, starting with indoor air-quality monitoring as a parallel testbed.",
      "If you work in agriculture, agritech or environmental monitoring and want to collaborate on or pilot this concept, we'd like to hear from you.",
    ],
    tags: ["IoT", "Smart Agriculture", "AI Insights", "Dashboards"],
    highlights: [
      "Sensor-based crop & environment monitoring concept",
      "AI-assisted irrigation and stress-signal notes",
      "Live dashboard with threshold alerts",
      "Parallel indoor air-quality monitoring testbed",
    ],
  },
  {
    slug: "whatsapp-business-automation",
    title: "WhatsApp Business Automation",
    status: "Prototype",
    summary:
      "A working prototype: AI + WhatsApp + automation + Google Sheets for instant lead handling, day or night.",
    body: [
      "This prototype demonstrates an end-to-end automated lead pipeline. When a customer messages on WhatsApp, an AI agent responds instantly, asks a few qualifying questions, and records the structured lead in Google Sheets — ready for the sales team each morning.",
      "Built with conversational AI and workflow automation (n8n-style pipelines), the prototype is designed to be adapted to real businesses: appointment booking, FAQ handling, order intake and follow-up reminders are all natural extensions.",
      "We're developing this into a deployable service for small businesses that live on WhatsApp. Talk to us if you want it adapted for your business.",
    ],
    tags: ["AI Agents", "WhatsApp", "n8n", "Google Sheets"],
    highlights: [
      "Instant AI replies to new WhatsApp inquiries",
      "Automated lead qualification conversation",
      "Structured leads logged to Google Sheets / CRM",
      "Extensible to bookings, FAQs and reminders",
    ],
  },
  {
    slug: "ai-creative-production",
    title: "AI Creative Production",
    status: "Concept",
    summary:
      "AI-assisted video, animation and brand content production via our creative arm, BlackInkMotion.",
    body: [
      "Through BlackInkMotion, our creative arm, we're building an AI-assisted production pipeline: generative video and 2D animation tools combined with human direction, scripting and editing.",
      "The concept is simple — professional brand films, product explainers and social content at a fraction of traditional production cost and turnaround time. Early work focuses on short-form explainers and animated brand pieces.",
      "If your brand needs consistent video content without a studio budget, this is the production model we're refining.",
    ],
    tags: ["AI Video", "2D Animation", "Brand Films", "Social Content"],
    highlights: [
      "AI-assisted video & animation pipeline",
      "Product explainers (60–90 seconds)",
      "Brand films and motion graphics",
      "Repeatable monthly content workflows",
    ],
  },
];

/* --------------------------------- Blog --------------------------------- */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "automate-first-ai-second",
    title: "Why Small Businesses Should Automate First, AI Second",
    excerpt:
      "AI gets the headlines, but automation pays the bills. Here's the order of operations we'd recommend to any small business.",
    date: "2026-09-20",
    readTime: "4 min read",
    body: [
      "Every week a new AI tool promises to transform your business. But walk into most small companies and you'll find the real bottleneck isn't a lack of intelligence — it's repetitive manual work. Copying data between apps. Chasing invoices. Answering the same five questions on WhatsApp fifty times a day.",
      "That's why we recommend automating first. Workflow automation — connecting the tools you already use so data moves itself — delivers measurable returns in weeks, not quarters. An automated lead pipeline or a self-updating report is unglamorous, but it frees hours every single week.",
      "AI comes second, layered on top of clean automated workflows. An AI agent that replies to customers is ten times more useful when it can actually look up orders, book appointments and log data — and all of that is automation, not AI.",
      "The practical sequence: map your most repetitive weekly tasks, automate the data movement, then add AI where judgment or conversation is needed. Businesses that do it in this order get faster wins and spend less — because they're not paying for AI to do work that a simple workflow could have done for free.",
    ],
  },
  {
    slug: "ai-iot-monitoring-physical-world",
    title: "AI + IoT: Monitoring the Physical World",
    excerpt:
      "Software ate the office. Now sensors and AI are coming for the field, the factory floor and the classroom.",
    date: "2026-09-05",
    readTime: "5 min read",
    body: [
      "For thirty years, software lived on screens. IoT changes that: cheap sensors now measure temperature, humidity, soil moisture, air quality and machine vibration continuously — and AI turns that stream of numbers into decisions.",
      "The pattern is always the same: sense, stream, alert, learn. Sensors collect data, a pipeline streams it to a dashboard, thresholds trigger alerts, and over time AI models learn what's normal — so they can flag what's not, before a human would notice.",
      "Two areas we're actively exploring illustrate the range. In smart agriculture, soil and environment sensors can guide irrigation timing and catch crop stress early — meaningful for water-scarce regions. Indoors, continuous air-quality monitoring in offices and classrooms turns an invisible health factor into a visible, manageable metric.",
      "The honest caveat: IoT is still harder than software. Sensors need power, connectivity and calibration; data needs cleaning. That's why we prototype first and scale later. But the direction is clear — the businesses that instrument their physical world will out-decide the ones that don't.",
    ],
  },
  {
    slug: "spreadsheets-to-dashboards",
    title: "From Spreadsheets to Dashboards: A Practical Path",
    excerpt:
      "You don't need to abandon Excel to get real analytics. Here's how to evolve without breaking what works.",
    date: "2026-08-18",
    readTime: "4 min read",
    body: [
      "Almost every small business runs on spreadsheets, and that's fine — spreadsheets are the most successful data tool in history. The problem isn't Excel; it's the manual work around it: copying, reconciling, rebuilding the same weekly report by hand.",
      "The practical path has three stages. First, clean up: one source of truth per dataset, consistent formats, no merged-cell chaos. Second, automate the plumbing: scheduled imports, scripted transformations, self-updating summary sheets. Third, visualize: connect the clean data to a live dashboard so the numbers are always current.",
      "Notice what's missing from that list: a big-bang migration to expensive software. Most teams should keep entering data in the Sheets they know and let automation do the rest. A dashboard that reads from your existing sheets beats a fancy platform nobody updates.",
      "When do you outgrow this? When you need multiple people editing safely, audit trails, or real-time data from many sources. Until then, the spreadsheet-to-dashboard path gives you 80% of the value at a fraction of the cost — and it keeps your team productive the whole way.",
    ],
  },
];

/* ------------------------------ Process steps ---------------------------- */

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    detail:
      "We map your goals, workflows and pain points — and identify where AI, automation or software will actually move the needle.",
  },
  {
    step: "02",
    title: "Design",
    detail:
      "You get a clear plan: architecture, screens or workflow diagrams, timelines and honest cost — before any code is written.",
  },
  {
    step: "03",
    title: "Build",
    detail:
      "We build in working increments you can see and test, with clean, documented, maintainable code throughout.",
  },
  {
    step: "04",
    title: "Deploy & Support",
    detail:
      "We ship to production, hand over documentation, and stay available for support, training and iteration.",
  },
];

/* --------------------------------- Values -------------------------------- */

export const values = [
  {
    title: "Practical over flashy",
    detail:
      "We build systems that work in the real world and pay for themselves — not demos that impress once and gather dust.",
  },
  {
    title: "Honest scoping",
    detail:
      "If a simple spreadsheet beats an AI system for your problem, we'll tell you. We'd rather earn trust than invoices.",
  },
  {
    title: "Clean, ownable code",
    detail:
      "Everything we build is documented and maintainable — by us, or by any developer you hire later. No lock-in.",
  },
  {
    title: "Security & privacy aware",
    detail:
      "Your data stays yours. We design with least-privilege access, and we never train models on your private data without consent.",
  },
];

/* --------------------------------- Impact -------------------------------- */
/* Field work: real visits, real videos, real photos.                        */
/* Videos below are real uploads from the AstolixGen YouTube channel.        */
/* Photos: drop real field photos into public/impact/ and list them here.   */

export const impactStories = [
  {
    id: "kpk-rural",
    kicker: "Rural KPK",
    title: "Where Education Is a Daily Struggle",
    description:
      "The AstolixGen team travelled to rural and remote mountain communities in Khyber Pakhtunkhwa to see firsthand how children learn where schools, teachers and connectivity are scarce — and to talk about what AI and IT education could mean for them.",
    youtubeId: "yfKlANrd5zg",
  },
  {
    id: "karachi-schools",
    kicker: "Karachi · Low-cost schools",
    title: "IT & AI Awareness for Teachers",
    description:
      "Sessions with teachers at low-resource schools in Karachi — including Qamar Educational Academy — on bringing IT and AI awareness into classrooms that run on passion more than budget.",
    youtubeId: "dV9OCJ04cyE",
  },
  {
    id: "itcn-asia-2026",
    kicker: "ITCN Asia 2026 · Karachi",
    title: "Pakistan's Biggest Tech & AI Exhibition",
    description:
      "AstolixGen at ITCN Asia 2026 in Karachi — Pakistan's biggest technology and AI exhibition — connecting with the country's tech community, including a visit with Rehan Allahwala.",
    youtubeId: "31ureB0omfc",
  },
  {
    id: "itcn-asia-2025",
    kicker: "ITCN Asia 2025 · Karachi",
    title: "On the floor of Pakistan's biggest ICT exhibition",
    description:
      "A look back at ITCN Asia 2025 — walking the floors of Pakistan's largest ICT and technology exhibition and meeting the builders shaping the industry.",
    youtubeId: "v3GeDJzaBTE",
  },
];

/* Real field photos. Files live in public/impact/. Add entries as photos arrive. */
export const impactPhotos: { src: string; alt: string }[] = [
  // Example once photos are provided:
  // { src: "/impact/kpk-visit-1.jpg", alt: "AstolixGen team with students in rural KPK" },
];
