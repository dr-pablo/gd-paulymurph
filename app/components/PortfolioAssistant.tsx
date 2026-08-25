"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type AssistantResponse = {
  answer: string;
  sources: Array<{ title: string; href: string }>;
  trace: { tool: string; mode: string; latencyMs: number };
};

type Message = {
  role: "user" | "assistant";
  content: string;
  response?: AssistantResponse;
};

const prompts = [
  "What problems is Paul best suited to solve?",
  "What outcomes has he delivered?",
  "What is his experience and background?",
];

export default function PortfolioAssistant({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask about Paul's experience, capabilities, results, or fit for a problem. I will stay focused on his published work and show the evidence used.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(question: string) {
    const value = question.trim();
    if (!value || isLoading) return;

    setMessages((current) => [...current, { role: "user", content: value }]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value }),
      });
      const data = (await response.json()) as AssistantResponse & { error?: string };
      if (!response.ok) throw new Error(data.error || "The assistant is unavailable.");
      setMessages((current) => [...current, { role: "assistant", content: data.answer, response: data }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant is unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <div className="technical-card overflow-hidden" aria-busy={isLoading}>
      <div className="flex items-center justify-between border-b border-border bg-foreground px-4 py-3 text-background">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-lavender" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em]">Portfolio assistant</span>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-background/55">Grounded / inspectable</span>
      </div>

      <div className={`overflow-y-auto p-4 md:p-5 ${compact ? "max-h-[34rem] min-h-96" : "min-h-[30rem] max-h-[42rem]"}`} aria-live="polite">
        <div className="space-y-5">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[88%]" : "max-w-[94%]"}>
              <p className="mb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                {message.role === "user" ? "You" : "Assistant"}
              </p>
              <div className={message.role === "user" ? "bg-lavender-soft p-3 text-sm leading-6" : "border-l-2 border-accent pl-4 text-sm leading-6"}>
                {message.content}
              </div>
              {message.response && (
                <div className="mt-3 border border-border bg-green-soft/55 p-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">
                    <span>Tool: {message.response.trace.tool}</span>
                    <span>Mode: {message.response.trace.mode}</span>
                    <span>{message.response.trace.latencyMs} ms</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {message.response.sources.map((source) => (
                      <Link key={source.href} href={source.href} className="text-xs font-medium text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent">
                        {source.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && <p className="font-mono text-xs text-accent">Retrieving approved sources...</p>}
        </div>
      </div>

      <div className="border-t border-border bg-paper p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void ask(prompt)}
              disabled={isLoading}
              className="border border-border bg-background px-2.5 py-1.5 text-left text-[0.67rem] text-muted-foreground hover:border-lavender hover:text-foreground disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor={compact ? "assistant-question-compact" : "assistant-question"} className="sr-only">Ask about Paul&apos;s work</label>
          <input
            id={compact ? "assistant-question-compact" : "assistant-question"}
            value={input}
            maxLength={500}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Paul's work..."
            className="min-w-0 flex-1 border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:border-lavender"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-45">
            Ask
          </button>
        </form>
        {error && <p className="mt-2 text-xs text-red-700" role="alert">{error}</p>}
        <p className="mt-3 text-[0.68rem] leading-5 text-muted-foreground">
          Questions may be processed by an external AI provider. Do not submit confidential or personal information.
        </p>
      </div>
    </div>
  );
}
