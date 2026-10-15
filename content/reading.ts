export type ReadingPick = {
  title: string;
  author: string;
  href: string;
  category: "Decisions" | "Economics" | "Investing" | "Building";
  note: string;
  current?: boolean;
  essential?: boolean;
};

export const readingPicks: ReadingPick[] = [
  {
    title: "When Money Dies",
    author: "Adam Fergusson",
    href: "https://www.goodreads.com/book/show/8567383-when-money-dies",
    category: "Economics",
    note: "A history of Weimar hyperinflation and a stark study of what happens when trust in money, institutions, and political restraint breaks down.",
    current: true,
  },
  {
    title: "The Creature from Jekyll Island",
    author: "G. Edward Griffin",
    href: "https://www.goodreads.com/book/show/66499.The_Creature_from_Jekyll_Island",
    category: "Economics",
    note: "A provocative account of the Federal Reserve's origins that rewards a critical read and sharper questions about central banking and monetary power.",
    essential: true,
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    href: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
    category: "Decisions",
    note: "A durable framework for recognizing where intuition works, where it fails, and how judgment gets distorted.",
    essential: true,
  },
  {
    title: "The Signal and the Noise",
    author: "Nate Silver",
    href: "https://www.goodreads.com/book/show/18733374-the-signal-and-the-noise",
    category: "Decisions",
    note: "A practical argument for probabilistic thinking, calibration, and humility when forecasts meet reality.",
    essential: true,
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    href: "https://www.goodreads.com/book/show/5908.The_Psychology_of_Money",
    category: "Investing",
    note: "Short, clear lessons on incentives, compounding, risk, and why behavior matters more than perfect models.",
    essential: true,
  },
  {
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    href: "https://www.goodreads.com/book/show/34536488-principles",
    category: "Building",
    note: "Useful ideas for turning repeated decisions into explicit systems that a team can examine and improve.",
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    href: "https://www.goodreads.com/book/show/106835.The_Intelligent_Investor",
    category: "Investing",
    note: "The foundational case for margin of safety, disciplined valuation, and separating price from underlying value.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel with Blake Masters",
    href: "https://www.goodreads.com/book/show/18050143-zero-to-one",
    category: "Building",
    note: "A compact set of contrarian questions about differentiation, durable advantage, and creating something genuinely new.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    href: "https://www.goodreads.com/book/show/40121378-atomic-habits",
    category: "Building",
    note: "A straightforward operating manual for making useful behavior easier and relying less on motivation.",
  },
];
