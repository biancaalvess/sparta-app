import { useNavigate } from "react-router";
import { useSparta } from "@/shared/context/SpartaContext";
import { Button } from "@/ui/components/ui/button";
import {
  Home,
  Dumbbell,
  ChefHat,
  User,
  Target,
  Calendar,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Goal } from "@/shared/types";

const GOAL_LABELS: Record<Goal, string> = {
  [Goal.WEIGHT_LOSS]: "Perda de peso",
  [Goal.HYPERTROPHY]: "Hipertrofia",
  [Goal.CONDITIONING]: "Condicionamento",
};

export function StudentProfile() {
  const navigate = useNavigate();
  const { user } = useSparta();

  const displayName = user?.name?.trim() || "Atleta";
  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "—";
  const levelLabel = user?.level ?? "—";
  const frequency = user?.frequency ?? 0;

  const handleLogout = () => {
    localStorage.removeItem("@sparta:user");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-page-dark pb-20 sm:pb-24 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — mesmo formato do dashboard (card arredondado) */}
        <header className="glass-card-3d border border-white/10 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl mb-1 truncate text-white font-bold">Meu perfil</h1>
          <p className="text-white/70 text-sm sm:text-base">Seus dados e preferências</p>
        </header>

        <div className="py-4 sm:py-5 lg:py-6 space-y-4 sm:space-y-5">
          <div className="glass-card-3d rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/[0.08] p-2.5 rounded-full shrink-0">
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary/80" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold truncate text-white/95 tracking-tight">
                  {displayName}
                </h2>
                <p className="text-[11px] font-medium text-white/50 mt-0.5">Aluno</p>
              </div>
            </div>

            <div className="space-y-0 border-t border-white/[0.06] pt-3">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <TrendingUp className="size-3.5 text-primary/60 shrink-0" />
                  Nível
                </span>
                <span className="text-sm font-medium text-white/90">{levelLabel}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-t border-white/[0.04]">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <Target className="size-3.5 text-primary/60 shrink-0" />
                  Objetivo
                </span>
                <span className="text-sm font-medium text-white/90">{goalLabel}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-t border-white/[0.04]">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <Calendar className="size-3.5 text-primary/60 shrink-0" />
                  Treinos por semana
                </span>
                <span className="text-sm font-medium text-white/90">{frequency}x</span>
              </div>
            </div>
          </div>

          <div className="glass-card-3d rounded-2xl p-4 sm:p-5">
            <h3 className="text-sm font-medium text-white/90 tracking-tight mb-3">Conta</h3>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-white/70 hover:text-white hover:bg-white/[0.06] rounded-lg"
              onClick={handleLogout}
            >
              <LogOut className="size-4 shrink-0" />
              Sair da conta
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - safe area para notch/home */}
      <nav
        className="fixed bottom-0 left-0 right-0 glass-card-3d border-0 border-t border-white/10 rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-around items-center min-h-14 sm:min-h-16 max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 text-white/70 hover:text-white touch-manipulation" onClick={() => navigate("/dashboard/student")}>
            <Home className="size-4 sm:size-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Início</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 text-white/70 hover:text-white touch-manipulation" onClick={() => navigate("/student/workouts")}>
            <Dumbbell className="size-4 sm:size-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Treinos</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 text-white/70 hover:text-white touch-manipulation" onClick={() => navigate("/diet")}>
            <ChefHat className="size-4 sm:size-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Dieta</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 touch-manipulation">
            <User className="size-4 sm:size-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
