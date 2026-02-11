import { useState } from "react";
import { useNavigate } from "react-router";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
import { Button } from "@/ui/components/ui/button";
import {
  ArrowLeft,
  Sparkles,
  Send,
  Mic,
  FileText,
  Users,
  LogOut,
} from "lucide-react";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Olá. Sou o assistente da Sparta Fitness AI. Posso ajudar com planejamento de treinos, sugestões de exercícios e dúvidas sobre a plataforma. Como posso ajudar?",
  },
  {
    id: "2",
    role: "user",
    content: "Pode sugerir um treino de pernas para iniciante?",
  },
  {
    id: "3",
    role: "assistant",
    content: "Claro. Para iniciantes, um bom treino de pernas pode incluir agachamento livre (3x12), leg press (3x12), cadeira extensora (3x12) e panturrilha em pé (3x15). Sempre aquecendo antes e respeitando o descanso entre séries. Quer que eu monte isso no seu plano?",
  },
];

export function AIAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <FileText />, label: "Revisões", onClick: () => navigate("/dashboard/professional") },
    { icon: <Users />, label: "Meus Alunos", onClick: () => navigate("/dashboard/professional/students") },
    { icon: <Sparkles />, label: "IA Assistente", onClick: () => navigate("/assistant") },
    { icon: <LogOut />, label: "Sair", onClick: () => navigate("/") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), role: "user", content: text },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-page-dark flex flex-col pb-20 sm:pb-24 relative overflow-hidden">
      {/* Logo de fundo (igual ao login) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        aria-hidden
      >
        <img
          src="/icon2.png"
          alt=""
          className="w-[min(120vmin,720px)] h-auto object-contain opacity-[0.07] select-none"
        />
      </div>

      {/* Conteúdo com efeito 3D suave */}
      <div
        className="relative z-10 w-full max-w-3xl mx-auto flex flex-col flex-1 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12"
        style={{ perspective: "1200px" }}
      >
        <div
          className="flex flex-col flex-1 min-h-0 rounded-2xl transition-shadow duration-300 px-4 sm:px-5 md:px-6"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-1deg) translateZ(16px)",
            boxShadow: "0 1px 0 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.12), 0 24px 48px -12px rgba(0,0,0,0.28)",
          }}
        >
          <header className="rounded-2xl px-4 py-4 sm:px-5 sm:py-5 md:px-6 mb-4 sm:mb-5 flex items-center gap-3 shrink-0 bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors duration-200"
              aria-label="Voltar"
            >
              <ArrowLeft className="size-5 sm:size-6" />
            </button>
            <div className="min-w-0 flex-1 flex items-center gap-3">
              <div className="size-10 sm:size-11 rounded-full flex items-center justify-center shrink-0 border border-primary/20 bg-primary/10">
                <Sparkles className="size-5 sm:size-6 text-primary/90" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-white truncate">IA Assistente</h1>
                <p className="text-xs sm:text-sm text-white/50 truncate">Treinos e planejamento</p>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto min-h-0 space-y-5 sm:space-y-6 pb-5">
            {messages.map((msg) =>
              msg.role === "assistant" ? (
                <div key={msg.id} className="flex gap-3 justify-start">
                  <div className="size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0 border border-primary/15 bg-primary/5 mt-0.5">
                    <Sparkles className="size-4 text-primary/80" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md px-4 py-3 sm:px-5 sm:py-4 max-w-[88%] sm:max-w-[82%] md:max-w-[80%] bg-white/[0.06] border border-white/[0.08]">
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-md px-4 py-3 sm:px-5 sm:py-4 max-w-[88%] sm:max-w-[82%] md:max-w-[80%] bg-primary/10 border border-primary/20">
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              )
            )}
          </main>

          <form
            onSubmit={handleSubmit}
            className="flex gap-3 items-center shrink-0 pt-3 pb-2"
          >
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/35 text-sm sm:text-base py-3.5 sm:py-4 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/25 transition-all duration-200"
                aria-label="Mensagem"
              />
            </div>
            <Button
              type="submit"
              variant="default"
              size="icon"
              className="shrink-0 size-12 sm:size-14 rounded-xl transition-transform duration-200 active:scale-95"
              aria-label="Enviar"
            >
              <Send className="size-5 sm:size-6" />
            </Button>
            <button
              type="button"
              className="shrink-0 size-12 sm:size-14 rounded-xl border border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-primary/90 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
              aria-label="Entrada por voz"
            >
              <Mic className="size-5 sm:size-6" />
            </button>
          </form>

          <div
            className="h-px shrink-0 mt-3 opacity-30"
            style={{ background: "linear-gradient(90deg, transparent, rgba(213, 159, 57, 0.4), transparent)" }}
            aria-hidden
          />
        </div>
      </div>

      <FloatingNav items={floatingNavItems} position="bottom-center" />
    </div>
  );
}
