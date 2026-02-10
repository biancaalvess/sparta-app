import { Button } from "@/ui/components/ui/button";
import {
  User,
  Users,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  // Função para simular o login e salvar o Role para a PrivateRoute autorizar
  const handleAccess = (role: 'STUDENT' | 'PROFESSIONAL' | 'ADMIN', path: string) => {
    // Simula o payload que viria do seu backend Java/Spring
    localStorage.setItem('@sparta:token', 'dev-access-token');
    localStorage.setItem('@sparta:user', JSON.stringify({ 
      name: 'Pedro Iago', 
      role: role 
    }));

    navigate(path);
  };

  const profiles = [
    {
      title: "Aluno",
      description: "Acesse seus treinos e acompanhe seu progresso",
      icon: User,
      role: "STUDENT",
      path: "/dashboard/student", // Rota corrigida conforme App.tsx
      gradient: "from-primary/20 to-transparent",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Personal Trainer",
      description: "Gerencie seus alunos e aprove treinos gerados pela IA",
      icon: Users,
      role: "PROFESSIONAL",
      path: "/dashboard/professional", // Rota corrigida conforme App.tsx
      gradient: "from-blue-500/20 to-transparent",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Administrador",
      description: "Dashboard com métricas e gestão da plataforma",
      icon: Shield,
      role: "ADMIN",
      path: "/dashboard/admin", // Rota corrigida conforme App.tsx
      gradient: "from-purple-500/20 to-transparent",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-page-dark flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <img
            src="/icon2.png"
            alt="Sparta Fitness AI"
            className="mx-auto mb-3 h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-lg"
          />
          <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold text-white">
            Sparta <span className="text-primary/90">Fitness AI</span>
          </h1>
          <p className="text-sm sm:text-base text-white/55 mt-1.5 max-w-sm mx-auto">
            Treinamento inteligente para guerreiros modernos
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-white/45">
            <Zap className="size-3.5 text-primary/70" />
            <span>Powered by Artificial Intelligence</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <button
                key={index}
                type="button"
                className="glass-card-3d rounded-2xl p-4 sm:p-5 text-left cursor-pointer group hover:bg-white/[0.08] hover:border-white/[0.08] active:scale-[0.99] transition-all"
                onClick={() => handleAccess(profile.role as any, profile.path)}
              >
                <div className={`${profile.iconBg} p-2.5 rounded-full w-fit group-hover:scale-105 transition-transform`}>
                  <Icon className={`size-6 sm:size-7 ${profile.iconColor} opacity-90`} />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white/95 mt-3 tracking-tight">{profile.title}</h3>
                <p className="text-white/55 text-sm mt-1 flex-1 leading-relaxed">
                  {profile.description}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary/90 group-hover:gap-2 transition-all">
                  Acessar
                  <ArrowRight className="size-4" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs text-white/45">
            Selecione seu perfil para acessar a plataforma
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-5 mt-2 text-[11px] text-white/35">
            <span>Dark Mode</span>
            <span>IA Generativa</span>
            <span>Alta Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
}