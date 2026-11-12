import { codingPdfBooks } from "./codingpdf-books";

export type BookTopic = string;
export type BookLevel = "Beginner" | "Intermediate" | "Advanced";

/**
 * "Free" = openly licensed or official free material (curated entries).
 * "Third-party listing" = a PDF listing from another site. We do not host it
 * and have not verified its copyright status.
 */
export type BookAccess = "Free" | "Third-party listing";

export type Book = {
  slug: string;
  title: string;
  author?: string;
  /** Publication year, or "Ongoing" for living docs and courses. */
  year?: string;
  description?: string;
  takeaways?: string[];
  /** Curated entries use a fixed topic; imported entries use their catalog category. */
  topic: BookTopic;
  level?: BookLevel;
  tags: string[];
  /** Main external link. Curated entries only. */
  href?: string;
  /** Publisher or hosting site. Curated entries only. */
  source?: string;
  /** Defaults to "Free" when omitted. */
  access?: BookAccess;
  /** Cover image URL. */
  cover?: string;
  /** Read-online (view) URL. */
  readUrl?: string;
  /** Direct PDF download URL. */
  downloadUrl?: string;
  /** Human-readable file size, e.g. "75.57 MB". */
  size?: string;
};

export const bookLevels: BookLevel[] = ["Beginner", "Intermediate", "Advanced"];

/** Curated free books and official docs (hand-picked, 11 entries). */
const curatedBooks: Book[] = [
  {
    slug: "eloquent-javascript",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    year: "2018",
    description:
      "A hands-on introduction to JavaScript and programming in general, with exercises, a browser chapter, and a Node.js section.",
    takeaways: [
      "Core syntax, functions, objects, and arrays",
      "Writing and debugging small programs step by step",
      "Working with the DOM and events in the browser",
    ],
    topic: "Web Frontend",
    level: "Beginner",
    tags: ["JavaScript", "DOM", "Exercises"],
    href: "https://eloquentjavascript.net/",
    source: "eloquentjavascript.net",
  },
  {
    slug: "you-dont-know-js-yet",
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
    year: "2020",
    description:
      "A deep series on the parts of JavaScript that are easy to misunderstand: scope, closures, prototypes, async code, and more.",
    takeaways: [
      "How scope and closures really work",
      "Prototypes and the object model",
      "Asynchronous JavaScript with promises and async/await",
    ],
    topic: "Web Frontend",
    level: "Intermediate",
    tags: ["JavaScript", "Closures", "Async"],
    href: "https://github.com/getify/You-Dont-Know-JS",
    source: "GitHub (open source)",
  },
  {
    slug: "mdn-learn-web-development",
    title: "MDN Learn Web Development",
    author: "Mozilla",
    year: "Ongoing",
    description:
      "Mozilla's official, continuously updated course covering HTML, CSS, JavaScript, accessibility, and how the web works.",
    takeaways: [
      "Structured modules from first HTML page to dynamic apps",
      "Reference-quality explanations of HTML, CSS, and JS",
      "Accessibility and performance guidance written by browser engineers",
    ],
    topic: "Web Frontend",
    level: "Beginner",
    tags: ["HTML", "CSS", "Official docs"],
    href: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    source: "MDN Web Docs",
  },
  {
    slug: "the-odin-project",
    title: "The Odin Project",
    author: "The Odin Project community",
    year: "Ongoing",
    description:
      "A free, project-based full-stack curriculum. The foundations path covers the command line, Git, HTML, CSS, and JavaScript through real builds.",
    takeaways: [
      "Learn by building one project after another",
      "Git and the command line from the start",
      "A clear path from frontend basics toward full-stack work",
    ],
    topic: "Web Frontend",
    level: "Beginner",
    tags: ["Curriculum", "Projects", "Git"],
    href: "https://www.theodinproject.com/",
    source: "theodinproject.com",
  },
  {
    slug: "prompt-engineering-guide",
    title: "Prompt Engineering Guide",
    author: "DAIR.AI",
    year: "Ongoing",
    description:
      "An open guide to prompting large language models, covering techniques, risks, and practical examples for building with LLMs.",
    takeaways: [
      "Prompt patterns such as few-shot and chain-of-thought",
      "How to evaluate and iterate on prompts",
      "Known limitations and safety considerations",
    ],
    topic: "AI & LLM",
    level: "Beginner",
    tags: ["Prompting", "LLM", "Guide"],
    href: "https://www.promptingguide.ai/",
    source: "promptingguide.ai",
  },
  {
    slug: "openai-cookbook",
    title: "OpenAI Cookbook",
    author: "OpenAI",
    year: "Ongoing",
    description:
      "Runnable notebooks and examples for building with the OpenAI API, including embeddings, retrieval, function calling, and evaluation.",
    takeaways: [
      "Code samples you can run and adapt",
      "Retrieval and embeddings for search over your own data",
      "Function calling and structured outputs",
    ],
    topic: "AI & LLM",
    level: "Intermediate",
    tags: ["OpenAI API", "Examples", "RAG"],
    href: "https://github.com/openai/openai-cookbook",
    source: "GitHub (open source)",
  },
  {
    slug: "hugging-face-llm-course",
    title: "Hugging Face LLM Course",
    author: "Hugging Face",
    year: "Ongoing",
    description:
      "A free course on transformer models and the Hugging Face ecosystem, from using pretrained models to fine-tuning them.",
    takeaways: [
      "Using transformers, tokenizers, and datasets",
      "Fine-tuning a model for a specific task",
      "Sharing models and demos on the Hub",
    ],
    topic: "AI & LLM",
    level: "Intermediate",
    tags: ["Transformers", "Fine-tuning", "Course"],
    href: "https://huggingface.co/learn/llm-course",
    source: "huggingface.co",
  },
  {
    slug: "practical-deep-learning-fastai",
    title: "Practical Deep Learning for Coders",
    author: "Jeremy Howard and fast.ai",
    year: "2022",
    description:
      "A top-down, code-first course in which you train working models early and learn the theory as you need it.",
    takeaways: [
      "Train and deploy image and text models quickly",
      "Practical habits for experiments and debugging",
      "Build intuition before the math",
    ],
    topic: "AI & LLM",
    level: "Intermediate",
    tags: ["Deep learning", "Python", "Course"],
    href: "https://course.fast.ai/",
    source: "fast.ai",
  },
  {
    slug: "dive-into-deep-learning",
    title: "Dive into Deep Learning",
    author: "Aston Zhang, Zachary Lipton, Mu Li, Alexander Smola",
    year: "2021",
    description:
      "An interactive open textbook that pairs math, runnable code, and discussion for deep learning from first principles.",
    takeaways: [
      "The math behind neural networks, with runnable code",
      "Transformers, attention, and modern architectures",
      "Implementing models from scratch and with frameworks",
    ],
    topic: "AI & LLM",
    level: "Advanced",
    tags: ["Deep learning", "Math", "Textbook"],
    href: "https://d2l.ai/",
    source: "d2l.ai",
  },
  {
    slug: "patterns-for-llm-systems",
    title: "Patterns for Building LLM-based Systems & Products",
    author: "Eugene Yan",
    year: "2024",
    description:
      "A practitioner's essay series on evaluation, retrieval, caching, guardrails, and product patterns for LLM applications.",
    takeaways: [
      "Evaluation methods that go beyond vibes",
      "Retrieval, caching, and guardrail patterns",
      "Designing LLM features that hold up in production",
    ],
    topic: "AI & LLM",
    level: "Advanced",
    tags: ["Architecture", "Evaluation", "Production"],
    href: "https://eugeneyan.com/writing/llm-patterns/",
    source: "eugeneyan.com",
  },
  {
    slug: "speech-and-language-processing",
    title: "Speech and Language Processing (3rd ed. draft)",
    author: "Daniel Jurafsky and James H. Martin",
    year: "Draft",
    description:
      "A standard NLP textbook with a free, continuously revised draft. Covers language models, transformers, and the foundations behind LLMs.",
    takeaways: [
      "Language modeling from n-grams to transformers",
      "Tokenization, embeddings, and sequence models",
      "Evaluation and the linguistic background of NLP",
    ],
    topic: "AI & LLM",
    level: "Advanced",
    tags: ["NLP", "Transformers", "Textbook"],
    href: "https://web.stanford.edu/~jurafsky/slp3/",
    source: "Stanford (free draft)",
  },
];

/** Curated entries first, then the imported CodingPDF catalog. */
export const books: Book[] = [...curatedBooks, ...codingPdfBooks];

/** Distinct topics across all books, sorted for the category filter. */
export const bookTopics: BookTopic[] = [
  ...new Set(books.map((book) => book.topic)),
].sort((a, b) => a.localeCompare(b));

export const getBook = (slug: string) => books.find((book) => book.slug === slug);
