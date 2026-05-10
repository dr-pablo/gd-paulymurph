'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ============================================
// FACTS DATABASE - Edit this to add/change facts
// ============================================
export interface PaulFact {
  topic: string;
  content: string;
  keywords: string[];
}

export const paulFacts: PaulFact[] = [
  { topic: 'Background', content: 'Midwest-born, enjoying the coast life now. Grew up on college football, SoundCloud rappers, and Jersey Shore.', keywords: ['background', 'born', 'from', 'where', 'hometown', 'midwest', 'coast'] },
  { topic: 'Personality', content: 'Extroverted introvert. Thrives in uncertainty and loves solving new problems.', keywords: ['personality', 'introvert', 'extrovert', 'social', 'character'] },
  { topic: 'Career', content: 'Started in trading, moved to economics, then data, now tech. The path made sense.', keywords: ['career', 'job', 'work', 'profession', 'tech', 'data', 'trading', 'economics'] },
  { topic: 'Interests', content: 'EDM festivals, bass fishing, Madden GM mode, and reading about economics and game theory.', keywords: ['hobby', 'hobbies', 'interest', 'edm', 'festival', 'fishing', 'bass', 'madden', 'gaming'] },
  { topic: 'Values', content: 'God and family first. Believes karma is real - treat people well.', keywords: ['value', 'believe', 'faith', 'god', 'religion', 'karma', 'principle'] },
  { topic: 'Fitness', content: 'Health and fitness are a big passion.', keywords: ['fitness', 'workout', 'gym', 'health', 'exercise', 'training'] },
  { topic: 'Investing', content: 'Been investing since before he legally could.', keywords: ['invest', 'investing', 'stocks', 'portfolio'] },
  { topic: 'Crypto', content: 'Early crypto mining - found the decentralized concept fascinating.', keywords: ['crypto', 'bitcoin', 'mining', 'blockchain'] },
  { topic: 'Construction', content: 'Has construction experience and sometimes misses those days.', keywords: ['construction', 'build', 'built'] },
  { topic: 'Family', content: 'COVID family time created some of his favorite memories.', keywords: ['family', 'covid', 'quarantine'] },
  { topic: 'Music', content: "Would've loved to see Avicii and Mac Miller live.", keywords: ['music', 'concert', 'avicii', 'mac miller', 'live'] },
  { topic: 'Collaboration', content: 'Always down to collaborate or brainstorm - just ask.', keywords: ['collab', 'collaborate', 'work together', 'brainstorm'] },
];

// System prompt for LLM (generated from facts)
export const generateSystemPrompt = (): string => `You are a helpful AI assistant for Paul Murphy's personal website. Be conversational, brief, and helpful.

About Paul:
${paulFacts.map(f => `- ${f.topic}: ${f.content}`).join('\n')}

Guidelines:
- Answer questions about Paul using the facts above
- Keep responses brief (1-2 sentences)
- If you don't know something, say so honestly
- Be casual and friendly`;

// ============================================
// TEXT MODE RESPONSE HANDLERS
// ============================================
const conversationResponses = {
  greeting: ["Yo! What's up? 💫 Ask me anything about Paul.", "Hey there! Ask me anything about Paul!", "What's good! Here to answer questions about Paul."],
  thanks: ["Anytime! Lmk if you have other questions.", "Of course! Happy to help.", "No problem! Anything else?"],
  goodbye: ["Catch you later! ✌️", "Talk soon! Don't be a stranger.", "Alright, take care! 💫"],
  unknown: ["Hmm, I don't have info on that. Try asking about Paul's background, career, hobbies, or values!", "That's outside what I know. Ask me about his career path, interests, or who he is!", "I don't have that info - but I'm great with questions about Paul. What else you got?"],
};

function findMatchingFact(query: string): PaulFact | null {
  const q = query.toLowerCase();
  for (const fact of paulFacts) {
    if (fact.keywords.some(k => q.includes(k))) return fact;
  }
  return null;
}

function generateTextResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (/^(hi|hey|hello|yo|what'?s up|sup)/.test(q)) 
    return conversationResponses.greeting[Math.floor(Math.random() * conversationResponses.greeting.length)];
  if (/(thanks|thank you|thx|ty)/.test(q) && !q.includes("n't"))
    return conversationResponses.thanks[Math.floor(Math.random() * conversationResponses.thanks.length)];
  if (/(bye|see ya|later|peace|goodbye)/.test(q))
    return conversationResponses.goodbye[Math.floor(Math.random() * conversationResponses.goodbye.length)];
  
  const fact = findMatchingFact(query);
  if (fact) return fact.content;
  
  return conversationResponses.unknown[Math.floor(Math.random() * conversationResponses.unknown.length)];
}

// ============================================
// BROWSER SUPPORT CHECK
// ============================================
export function isWebLLMSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return ua.includes('Chrome') || ua.includes('Edge');
}

export function getBrowserName(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = window.navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'your browser';
}

// ============================================
// COMPONENTS
// ============================================
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={`message ${message.role}`}>
      <span className="message-role">{message.role === 'user' ? 'you' : 'paul'}</span>
      <p className="message-content">{message.content}</p>
    </div>
  );
}

// WebLLM model configuration - tries models in order of preference
const LLM_MODELS = [
  'Llama-3.2-1B-Instruct-q4f16_1-MLC',
  'Qwen2.5-0.5B-Instruct-q4f16_1-MLC',
  'Phi-3.5-mini-instruct-q4f16_1-MLC',
];

// ============================================
// MAIN COMPONENT
// ============================================
interface PaulChatProps {
  onFactsClick?: () => void;
}

export function PaulChat({ onFactsClick }: PaulChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Yo! I'm Paul's AI. Ask me anything about him 💫" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // LLM state
  const [llmMode, setLlmMode] = useState<'off' | 'loading' | 'on'>('off');
  const [llmStatus, setLlmStatus] = useState<string>('');
  const [llmError, setLlmError] = useState<string>('');
  const [llmProgress, setLlmProgress] = useState<number>(0);
  const [browserSupported, setBrowserSupported] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engineRef = useRef<any>(null);

  // Check browser support after mount (avoids hydration mismatch)
  useEffect(() => {
    setBrowserSupported(isWebLLMSupported());
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Toggle LLM with detailed feedback
  const toggleLLM = useCallback(async () => {
    if (llmMode === 'on') {
      if (engineRef.current) {
        engineRef.current.delete?.();
        engineRef.current = null;
      }
      setLlmMode('off');
      setLlmStatus('');
      setLlmError('');
      setLlmProgress(0);
      return;
    }
    
    if (!isWebLLMSupported()) {
      const browser = getBrowserName();
      setLlmError(
        `🤖 AI mode needs Chrome or Edge to run.\n\nYou're using ${browser}, which doesn't support WebLLM yet. ` +
        `Try opening this page in Chrome for the full experience!`
      );
      return;
    }
    
    setLlmMode('loading');
    setLlmError('');
    setLlmProgress(10);
    setLlmStatus('Starting up AI model...');
    
    try {
      const webllm = await import('@mlc-ai/web-llm');
      setLlmProgress(20);
      setLlmStatus('Loading model weights...');
      
      // Try each model until one works
      let engine = null;
      let lastError = '';
      
      for (const modelName of LLM_MODELS) {
        try {
          setLlmStatus(`Trying ${modelName.split('-')[0]}...`);
          engine = await webllm.CreateMLCEngine(modelName, {
            initProgressCallback: (p: { progress: number; text?: string }) => {
              const progress = Math.min(20 + (p.progress * 70), 90);
              setLlmProgress(progress);
              if (p.text) setLlmStatus(p.text);
            },
          });
          break; // Success!
        } catch (e) {
          lastError = e instanceof Error ? e.message : 'Unknown error';
          console.log(`Model ${modelName} failed, trying next...`, lastError);
        }
      }
      
      if (!engine) {
        throw new Error(
          `Couldn't load any AI model. This usually means:\n\n` +
          `• Your browser's GPU/WebGPU isn't enabled\n` +
          `• Not enough GPU memory available\n` +
          `• The model files couldn't download\n\n` +
          `Fix: Try enabling hardware acceleration in your browser settings, ` +
          `or use Chrome with a dedicated GPU. The text mode still works great! 🎯`
        );
      }
      
      setLlmProgress(100);
      setLlmStatus('AI ready!');
      engineRef.current = engine;
      setLlmMode('on');
      setTimeout(() => setLlmStatus(''), 2000);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setLlmError(
        `⚠️ AI mode couldn't start.\n\n` +
        `Error: ${errorMsg}\n\n` +
        `This might be fixed by:\n` +
        `• Enabling hardware acceleration in browser settings\n` +
        `• Making sure you have a GPU with WebGPU support\n` +
        `• Checking you have enough free memory\n\n` +
        `The text mode still works perfectly! Just type your question.`
      );
      setLlmMode('off');
      setLlmProgress(0);
    }
  }, [llmMode]);

  // Submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    await new Promise(r => setTimeout(r, 150));
    
    let response: string;
    
    if (llmMode === 'on' && engineRef.current) {
      try {
        const completion = await engineRef.current.chat.completions.create({
          messages: [{ role: 'system', content: generateSystemPrompt() }, { role: 'user', content: userMessage }],
          max_tokens: 150,
          temperature: 0.7,
        });
        response = completion.choices[0]?.message?.content || generateTextResponse(userMessage);
      } catch {
        response = generateTextResponse(userMessage);
      }
    } else {
      response = generateTextResponse(userMessage);
    }
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  }, [input, isLoading, llmMode]);

  return (
    <div className="paul-chat-wrapper">
      {/* Header with LLM toggle and facts button */}
      <div className="chat-header">
        <button 
          className="facts-btn"
          onClick={onFactsClick}
          title="View all facts about Paul"
        >
          📋 Fact List
        </button>
        
        <div className="mode-indicator">
          <span className="mode-label">
            {llmMode === 'on' ? '⚡ Llama 3.2 1B' : '📝 Text Mode'}
          </span>
          <button 
            className={`llm-toggle-btn ${llmMode === 'on' ? 'active' : ''}`}
            onClick={toggleLLM}
            disabled={llmMode === 'loading'}
            title={browserSupported ? 'Toggle AI mode' : 'AI mode requires Chrome or Edge'}
          >
            {llmMode === 'loading' ? '⏳' : llmMode === 'on' ? '✓' : '⚡'}
          </button>
        </div>
      </div>
      
      {/* LLM Status/Error Banner */}
      {llmMode === 'loading' && (
        <div className="llm-status-bar">
          <div className="llm-progress-track">
            <div className="llm-progress-fill" style={{ width: `${llmProgress}%` }} />
          </div>
          <span className="llm-status-text">{llmStatus || 'Loading...'}</span>
        </div>
      )}
      
      {llmError && (
        <div className="llm-error-banner">
          <button 
            className="llm-error-dismiss" 
            onClick={() => setLlmError('')}
            title="Dismiss"
          >
            ✕
          </button>
          <pre className="llm-error-text">{llmError}</pre>
        </div>
      )}
      
      {/* Chat container */}
      <div className="chat-container">
        <div className="chat-messages" ref={chatContainerRef}>
          {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
          {isLoading && (
            <div className="typing-indicator">
              <span /><span /><span />
            </div>
          )}
        </div>
        
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about Paul..."
            disabled={isLoading}
            className="chat-input"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="chat-submit">
            {isLoading ? '⏳' : '→'}
          </button>
        </form>
      </div>
    </div>
  );
}
