import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X, Send, ArrowUpRight, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { cn } from "../../utils/cn";
import { generateAlyaInsights, alyaReply } from "../../utils/alya";
import type { AlyaInsight } from "../../utils/alya";

interface ChatMessage {
  id: string;
  sender: "alya" | "user";
  text: string;
  href?: string;
  tone?: AlyaInsight["tone"];
}

const toneIcon: Record<AlyaInsight["tone"], typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  opportunity: TrendingUp,
};

const toneColor: Record<AlyaInsight["tone"], string> = {
  info: "text-azure-500 bg-azure-50 dark:bg-azure-500/10 dark:text-azure-400",
  warning: "text-amber-500 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
  opportunity: "text-signal-500 bg-signal-50 dark:bg-signal-500/10 dark:text-signal-400",
};

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export function AlyaAssistant() {
  const [open, setOpen] = useState(false);
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !hasIntroduced) {
      const insights = generateAlyaInsights();
      const intro: ChatMessage = {
        id: nextId(),
        sender: "alya",
        text: `Bonjour ! J'ai analysé votre portefeuille : ${insights.length} points méritent votre attention aujourd'hui.`,
      };
      const insightMessages: ChatMessage[] = insights.map((i) => ({
        id: nextId(),
        sender: "alya",
        text: i.text,
        href: i.href,
        tone: i.tone,
      }));
      setMessages([intro, ...insightMessages]);
      setHasIntroduced(true);
    }
  }, [open, hasIntroduced]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: nextId(), sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const delay = 550 + Math.random() * 500;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: nextId(), sender: "alya", text: alyaReply(trimmed) }]);
    }, delay);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-iris-signal py-3 pl-3.5 pr-4.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 dark:shadow-glow-dark"
          aria-label="Ouvrir Alya, votre assistante assurance"
        >
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 animate-pulse-soft rounded-full bg-white/30" />
            <Sparkles className="relative h-4 w-4" />
          </span>
          Alya
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[32rem] w-[23rem] max-w-[calc(100vw-2rem)] animate-float-in flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-popover backdrop-blur-xl dark:border-white/[0.1] dark:bg-ink-900/95">
          <div className="flex items-center justify-between gap-3 border-b border-mist bg-iris-signal px-4 py-3.5 dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-4.5 w-4.5 text-white" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white">Alya</p>
                <p className="text-2xs text-white/80">Votre assistante assurance</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer Alya"
              className="rounded-lg p-1.5 text-white/80 hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-none">
            {messages.map((m) => {
              if (m.sender === "user") {
                return (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-ink-900 px-3.5 py-2.5 text-sm text-white dark:bg-white dark:text-ink-950">
                      {m.text}
                    </div>
                  </div>
                );
              }
              const Icon = m.tone ? toneIcon[m.tone] : Sparkles;
              return (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-mist bg-white px-3.5 py-2.5 text-sm text-ink-700 shadow-card dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-ink-100">
                    <div className="flex items-start gap-2">
                      {m.tone && (
                        <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md", toneColor[m.tone])}>
                          <Icon className="h-3 w-3" />
                        </span>
                      )}
                      <p className="leading-snug">{m.text}</p>
                    </div>
                    {m.href && (
                      <Link
                        to={m.href}
                        onClick={() => setOpen(false)}
                        className="mt-2 flex items-center gap-1 text-xs font-semibold text-iris-600 hover:text-iris-700 dark:text-iris-300"
                      >
                        Voir le détail <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-mist bg-white px-3.5 py-3 shadow-card dark:border-white/[0.08] dark:bg-white/[0.04]">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-ink-300 dark:bg-ink-300/60"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-mist p-3 dark:border-white/[0.08]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Posez une question à Alya..."
              className="h-10 flex-1 rounded-xl border border-mist bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-iris-400 focus:outline-none focus:ring-2 focus:ring-iris-100 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-ink-300/50"
            />
            <button
              onClick={handleSend}
              aria-label="Envoyer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-iris-signal text-white transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
