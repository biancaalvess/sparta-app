import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { 
  User, 
  Users, 
  Shield, 
  Zap,
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Ajustado para react-router-dom

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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Logo & Header */}
        <div className="text-center mb-12 bg-transparent">
          <img
            src="/icon2.png"
            alt="Sparta Fitness AI"
            className="mx-auto mb-4 h-28 w-28 sm:h-36 sm:w-36 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl tracking-tight font-display font-bold">
            SPARTA <span className="text-primary font-display font-bold">FITNESS AI</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Treinamento inteligente para guerreiros modernos
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Powered by Artificial Intelligence</span>
          </div>
        </div>

        {/* Profile Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <Card 
                key={index}
                className={`bg-gradient-to-br ${profile.gradient} border-border hover:border-primary/50 transition-all cursor-pointer group`}
                onClick={() => handleAccess(profile.role as any, profile.path)}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className={`${profile.iconBg} p-4 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${profile.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{profile.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {profile.description}
                  </p>
                  
                  <Button 
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:gap-3 transition-all"
                  >
                    Acessar
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Selecione seu perfil para acessar a plataforma
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span>Dark Mode First</span>
            <span>IA Generativa</span>
            <span>Alta Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
}