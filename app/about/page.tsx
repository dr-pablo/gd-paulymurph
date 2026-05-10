'use client';

import { useState } from "react";
import { PaulChat, paulFacts, type PaulFact } from "../components/PaulChat";

function FactsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  return (
    <div className="facts-modal-overlay" onClick={onClose}>
      <div className="facts-modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>About Me</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">
          {paulFacts.map((fact: PaulFact, i: number) => (
            <div key={i} className="fact-item">
              <span className="fact-topic">{fact.topic}</span>
              <p className="fact-text">{fact.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [isFactsOpen, setIsFactsOpen] = useState(false);

  return (
    <>
      <FactsModal isOpen={isFactsOpen} onClose={() => setIsFactsOpen(false)} />
      
      <div className="min-h-screen">
        {/* Background gradient blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-blue-500/30 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-2xl mx-auto px-6 py-24 md:py-32">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text inline-block">
              About Me
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
              Chat with my AI about me!
            </p>
          </div>

          {/* AI Chat Container */}
          <div className="chat-wrapper">
            <PaulChat onFactsClick={() => setIsFactsOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
}
