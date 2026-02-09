import { useState } from "react";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Progress } from "@/ui/components/ui/progress";
import { Badge } from "@/ui/components/ui/badge";
import { 
  Flame, 
  Dumbbell, 
  PlayCircle, 
  ChefHat, 
  TrendingUp, 
  Trophy,
  Home,
  Calendar,
  User
} from "lucide-react";
import { useNavigate } from "react-router";

export function StudentDashboard() {
  const navigate = useNavigate();
  const [currentStreak] = useState(7);
  
  // Mock data
  const todayWorkout = {
    name: "Hypertrophy Push A",
    type: "Upper Body",
    duration: "60 min",
    exercises: 8,
  };

  const macros = {
    protein: { current: 120, target: 180, unit: "g" },
    carbs: { current: 180, target: 250, unit: "g" },
    fats: { current: 45, target: 60, unit: "g" },
    calories: { current: 1650, target: 2400, unit: "kcal" },
  };

  const recentWorkouts = [
    { name: "Leg Day", date: "Ontem", completed: true },
    { name: "Pull Workout", date: "2 dias atrás", completed: true },
    { name: "Cardio HIIT", date: "3 dias atrás", completed: true },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-1">Olá, Atleta! 💪</h1>
            <p className="text-muted-foreground">Vamos dominar o dia</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border border-primary/20">
          <div className="bg-primary/20 p-3 rounded-full">
            <Flame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sequência Atual</p>
            <p className="text-2xl font-bold text-primary">{currentStreak} dias</p>
          </div>
          <div className="ml-auto">
            <Trophy className="h-8 w-8 text-primary/60" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Today's Workout Card */}
        <Card className="bg-card border-primary/30 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/20 to-transparent p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-primary text-primary-foreground mb-2">
                  TREINO DE HOJE
                </Badge>
                <h2 className="text-2xl mb-1">{todayWorkout.name}</h2>
                <p className="text-muted-foreground">{todayWorkout.type}</p>
              </div>
              <Dumbbell className="h-12 w-12 text-primary/40" />
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>{todayWorkout.exercises} exercícios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{todayWorkout.duration}</span>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14"
              onClick={() => navigate("/student/workout")}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              INICIAR TREINO
            </Button>
          </div>
        </Card>

        {/* Daily Diet Progress */}
        <Card className="bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/20 p-2 rounded-lg">
              <ChefHat className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl">Dieta de Hoje</h3>
          </div>

          <div className="space-y-5">
            {/* Calories */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Calorias</span>
                <span className="text-sm text-muted-foreground">
                  {macros.calories.current}/{macros.calories.target} {macros.calories.unit}
                </span>
              </div>
              <Progress 
                value={(macros.calories.current / macros.calories.target) * 100} 
                className="h-3 bg-muted"
              />
            </div>

            {/* Protein */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Proteína</span>
                <span className="text-sm text-muted-foreground">
                  {macros.protein.current}/{macros.protein.target} {macros.protein.unit}
                </span>
              </div>
              <Progress 
                value={(macros.protein.current / macros.protein.target) * 100}
                className="h-3 bg-muted [&>div]:bg-primary"
              />
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Carboidratos</span>
                <span className="text-sm text-muted-foreground">
                  {macros.carbs.current}/{macros.carbs.target} {macros.carbs.unit}
                </span>
              </div>
              <Progress 
                value={(macros.carbs.current / macros.carbs.target) * 100}
                className="h-3 bg-muted [&>div]:bg-blue-500"
              />
            </div>

            {/* Fats */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Gorduras</span>
                <span className="text-sm text-muted-foreground">
                  {macros.fats.current}/{macros.fats.target} {macros.fats.unit}
                </span>
              </div>
              <Progress 
                value={(macros.fats.current / macros.fats.target) * 100}
                className="h-3 bg-muted [&>div]:bg-orange-500"
              />
            </div>
          </div>
        </Card>

        {/* Recent Workouts */}
        <Card className="bg-card p-6">
          <h3 className="text-xl mb-4">Treinos Recentes</h3>
          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded">
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                </div>
                {workout.completed && (
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    Completo
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-1">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-xs text-primary">Início</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-col h-auto gap-1"
            onClick={() => navigate("/student/workouts")}
          >
            <Dumbbell className="h-5 w-5" />
            <span className="text-xs">Treinos</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-1">
            <ChefHat className="h-5 w-5" />
            <span className="text-xs">Dieta</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-col h-auto gap-1"
            onClick={() => navigate("/student/profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}