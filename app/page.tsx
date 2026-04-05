import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Full viewport, centered */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Name & Title */}
          <div className="space-y-4 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text inline-block">
                Hi, I&apos;m Paul
              </h1>
          </div>

          {/* Subtle tagline */}
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Yes.. I've seen <Link className="font-bold" href={'https://www.youtube.com/watch?v=_Fx6eCGsXMw'} target="__blank">the monkey</Link> 🙂
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            This site is just my corner of the internet. <br/>You can read about what I have been doing/learning/thinking.<br/>
            I might end up adding more, I might not.<br/>
            Either way, hope you get something out of this visit. <br/> GLHF
          </p>


          {/* Navigation hint */}
          <div className="pt-16 animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>About Me</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/8 -right-32 w-96 h-96 bg-blue-500/50 rounded-full blur-[128px]" />
      </div>
    </div>
  );
}
