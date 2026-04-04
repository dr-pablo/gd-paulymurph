import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Paul Murphy",
  description: "A little about Paul Murphy beyond the resume.",
};

const lines = [
  <>God and Family above all else. ✝️</>,
  <>Extroverted Introvert.</>,
  <>Grew up on college football, soundcloud rappers, and jersey shore. 🏈</>,
  <>Midwest born and raised with a palette for the coast. 🦀</>,
  <>Investing since before I could, literally.</>,
  <>Trading led me to economics, economics led me to data, data led me to technology.</>,
  <>I actually do sometimes <span className="italic">miss</span> the construction days.</>,
  <>The time I spent with my family during covid created the <span className="font-semibold text-foreground">best memories.</span></>,
  <>I thrive in uncertainty. I am most successful solving new problems.</>,
  <>EX-smoker, feels good.</>,
  <>EX-vaper, feels great.</>,
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-blue-500/30 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text inline-block">
            About
          </h1>
        </div>

        {/* Lines */}
        <ul className="space-y-7">
          {lines.map((line, i) => (
            <li
              key={i}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up opacity-0 flex gap-4 items-baseline"
              style={{
                animationDelay: `${0.05 * (i + 1)}s`,
                animationFillMode: "forwards",
              }}
            >
              <span className="text-accent/50 text-sm mt-1 shrink-0">—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Closing statement */}
        <div
          className="mt-24 animate-slide-up opacity-0"
          style={{ animationDelay: `${0.05 * (lines.length + 2)}s`, animationFillMode: "forwards" }}
        >
          <p className="text-4xl md:text-5xl font-bold gradient-text inline-block">
            I am.
          </p>
        </div>
      </div>
    </div>
  );
}
