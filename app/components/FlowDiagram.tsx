export default function FlowDiagram({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <div className={`grid gap-px border border-border bg-border ${compact ? "sm:grid-cols-3" : "md:grid-cols-3"}`}>
      {steps.map((step, index) => (
        <div key={step} className="relative min-h-24 bg-paper p-4">
          <span className="font-mono text-[0.62rem] text-lavender">{String(index + 1).padStart(2, "0")}</span>
          <p className="mt-4 max-w-44 text-sm font-medium leading-5">{step}</p>
          {index < steps.length - 1 && (
            <span className="absolute bottom-3 right-3 font-mono text-xs text-accent" aria-hidden="true">→</span>
          )}
        </div>
      ))}
    </div>
  );
}
