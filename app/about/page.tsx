import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Paul Murphy",
  description: "A little about Paul Murphy beyond the resume.",
};

const lines = [
  <>God and Family above all else. ✝️</>,
  <>Extroverted Introvert.</>,
  <>Grew up on college football, soundcloud rappers, and jersey shore. 🏈 lol</>,
  <>Nowadays, you'll catch me at an edm festival or fishing for bass.</>,
  <>Seeing Avicii and Mac Miller perform live is my only wish.</>,
  <>Midwest born and raised with a palate for the coast. 🦀</>,
  <>Investing since before I could, literally.</>,
  <>Mining crypto was/is one of the coolest economic concepts I have ever heard of. Decentralized money printing.</>,
  <>Trading led me to economics, economics led me to data, data led me to technology.</>,
  <>I actually do sometimes <span className="italic">miss</span> the construction days.</>,
  <>The time I spent with my family during covid created some of the <span className="font-semibold text-foreground">best memories.</span></>,
  <>I thrive in uncertainty. I am most successful solving new problems.</>,
  <>I enjoy reading about economics, game theory, and productivity hacking.</>,
  <>Health and Fitness have been a passion for a long time, talk to me about your stack!</>,
  <>Retired Madden GM, might catch me sniping in Fortnite though.</>,
  <>Karma is real, be good to people and people will be good to you.</>,
  <>Always open to collabrate or just brainstorm. Lmk what you're working on!</>
//   <>EX-smoker, feels good.</>,
//   <>EX-vaper, feels great.</>,
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
        <ul className="space-y-3">
        {lines.map((line, i) => {
        const t = i / (lines.length - 1);

        return (
            <li
            key={i}
            className="text-sm md:text-lg text-muted-foreground leading-relaxed animate-slide-up opacity-0 flex gap-1 items-baseline"
            style={{
                animationDelay: `${0.05 * (i + 1)}s`,
                animationFillMode: "forwards",
            }}
            >
                <span
                className="text-sm shrink-0 text-accent-hover"
                style={{ opacity: 0.5 + t * 0.9 }}
                >
                +
                </span>
                <span>{line}</span>
            </li>
            );
            })}        
        </ul>
      </div>
    </div>
  );
}
