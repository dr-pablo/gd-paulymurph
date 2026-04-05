import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List | Paul Murphy",
  description: "Books and resources I'm currently reading or recommend.",
};

interface ReadingItem {
  title: string;
  author: string;
  link: string;
  category: string;
  status?: "currently_reading" | "must_read" | "recommended";
}

const reading_list: ReadingItem[] = [
  {
    title: "The Creature from Jekyll Island",
    author: "G. Edward Griffin",
    link: "https://www.goodreads.com/book/show/514235.The_Creature_from_Jekyll_Island",
    category: "Economics",
    status: "currently_reading",
  },
  {
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    link: "https://www.goodreads.com/book/show/34536488-principles",
    category: "Business",
    status: "must_read",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    link: "https://www.goodreads.com/book/show/5908.The_Psychology_of_Money",
    category: "Finance",
    status: "must_read",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    link: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
    category: "Psychology",
    status: "must_read",
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    link: "https://www.goodreads.com/book/show/48039.The_Intelligent_Investor",
    category: "Finance",
    status: "recommended",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    link: "https://www.goodreads.com/book/show/40121378-atomic-habits",
    category: "Self-Improvement",
    status: "recommended",
  },
  {
    title: "The Signal and the Noise",
    author: "Nate Silver",
    link: "https://www.goodreads.com/book/show/18733374-the-signal-and-the-noise",
    category: "Data Science",
    status: "recommended",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    link: "https://www.goodreads.com/book/show/18050143-zero-to-one",
    category: "Business",
    status: "recommended",
  },
];

export default function ReadingListPage() {
  const currentlyReading = reading_list.filter((item) => item.status === "currently_reading");
  const mustReads = reading_list.filter((item) => item.status === "must_read");
  const otherRecs = reading_list.filter((item) => item.status === "recommended");

  return (
    <div className="min-h-screen py-20">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-blue-500/30 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text inline-block">
          Reading List
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
          Books and resources I'm currently reading or recommend.
        </p>
      </section>

      {/* Currently Reading - Hero Section */}
      {currentlyReading.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
            Currently Reading
          </h2>
          <div className="gradient-border rounded-2xl p-8 glow bg-muted/20">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-36 rounded-lg bg-gradient-to-br from-accent/30 to-blue-500/30 flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                </div>
              </div>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  {currentlyReading[0].category}
                </span>
                <h3 className="text-2xl font-semibold">{currentlyReading[0].title}</h3>
                <p className="text-muted-foreground">{currentlyReading[0].author}</p>
                <a
                  href={currentlyReading[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  View on Goodreads
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top 3 Must Reads */}
      {mustReads.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
            Top 3 Must Reads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mustReads.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <article className="h-full gradient-border rounded-xl p-6 hover:bg-muted/30 transition-colors glow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-accent/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.author}</p>
                </article>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Other Recommendations */}
      {otherRecs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
            Other Recommendations
          </h2>
          <div className="space-y-4">
            {otherRecs.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <article className="flex items-center justify-between gradient-border rounded-xl p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm">📚</span>
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {item.category}
                    </span>
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
