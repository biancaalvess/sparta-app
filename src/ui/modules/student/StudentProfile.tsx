import { useNavigate } from "react-router";
import { useSparta } from "@/shared/context/SpartaContext";
import { Button } from "@/ui/components/ui/button";
import { PageHeader } from "@/ui/components/ui/page-header";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
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

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <Home />, label: "Início", onClick: () => navigate("/dashboard/student") },
    { icon: <Dumbbell />, label: "Treinos", onClick: () => navigate("/student/workouts") },
    { icon: <ChefHat />, label: "Dieta", onClick: () => navigate("/diet") },
    { icon: <User />, label: "Perfil", onClick: () => navigate("/dashboard/perfil") },
  ];

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
        <PageHeader
          title="Meu perfil"
          subtitle="Seus dados e preferências"
          titleSize="large"
        />

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

      <FloatingNav items={floatingNavItems} position="bottom-center" />
    </div>
  );
}
