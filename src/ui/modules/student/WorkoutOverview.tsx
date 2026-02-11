import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
import { PlayCircle, ArrowLeft, Flame, Clock, Dumbbell, Check, Home, ChefHat, User } from "lucide-react";
import { IMAGES } from "@/shared/constants/images";
import { getWorkoutFromStorage, setWorkoutInStorage } from "@/shared/utils/workoutStorage";
import type { Workout, Exercise } from "@/shared/types";
import { MuscleGroup } from "@/shared/types";

/** Dados exibidos na tela (apenas apresentação). Calorias quando vier da API no futuro. */
export interface WorkoutOverviewData {
  workout: Workout;
  /** Calorias estimadas */
  caloriesEstimated?: number;
  /** URL do avatar do instrutor ou indicador de contexto (opcional) */
  instructorAvatarUrl?: string;
}

/** Treino de demonstração quando o contexto ainda não tem currentWorkout (ex.: após login sem API). Exportado para ActiveWorkout. */
export const DEMO_WORKOUT: Workout = {
  id: "demo-1",
  name: "TREINO A - Peito e Tríceps",
  focalMuscles: "Peito e Tríceps",
  duration: 45,
  completedCount: 0,
  exercises: [
    {
      id: "ex-1",
      name: "Agachamento livre",
      sets: 4,
      reps: "10-12",
      muscleGroup: MuscleGroup.LEGS,
      image: IMAGES.WORKOUT_MAIN,
      equipment: "Barra",
    },
    {
      id: "ex-2",
      name: "Supino reto",
      sets: 4,
      reps: "10-12",
      muscleGroup: MuscleGroup.CHEST,
      image: IMAGES.WORKOUT_MAIN,
      technique: "Ponto de Falha",
      equipment: "Barra",
    },
    {
      id: "ex-3",
      name: "Remada curvada",
      sets: 3,
      reps: "12",
      muscleGroup: MuscleGroup.BACK,
      image: IMAGES.WORKOUT_MAIN,
      technique: "Drop Set",
      equipment: "Halteres",
    },
  ],
  isAiGenerated: true,
};

export interface WorkoutOverviewCallbacks {
  onBack: () => void;
  onStartWorkout: () => void;
  /** Ao marcar/desmarcar exercício como concluído (checkbox) */
  onToggleExerciseDone?: (exerciseId: string) => void;
  /** Ao clicar em um exercício da lista (abrir tela de execução) */
  onExerciseClick?: (exercise: Exercise, index: number) => void;
}

export interface WorkoutOverviewProps extends WorkoutOverviewData, WorkoutOverviewCallbacks {}

/**
 * Tela de visão geral do treino (definido pelo personal).
 * Header sticky, progress bar e lista com thumbnail, metadados, badge de técnica e checkbox.
 */
export function WorkoutOverviewScreen({
  workout,
  caloriesEstimated,
  instructorAvatarUrl,
  onBack,
  onStartWorkout,
  onToggleExerciseDone,
  onExerciseClick,
}: WorkoutOverviewProps) {
  const completedCount = useMemo(
    () => workout.exercises.filter((e) => e.done).length,
    [workout.exercises]
  );
  const totalCount = workout.exercises.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const heroImage = workout.exercises[0]?.image || IMAGES.WORKOUT_MAIN;

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-page-dark flex flex-col pb-20 sm:pb-24">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1" style={{ perspective: "1200px" }}>
        {/* Header — 3D/sombra */}
        <header
          className="glass-card-3d border border-white/10 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 mb-4 sm:mb-5 flex items-center justify-between gap-3 transition-shadow duration-300"
          style={{
            boxShadow: "0 1px 0 0 rgba(255,255,255,0.12), 0 6px 20px rgba(0,0,0,0.18), 0 20px 45px -12px rgba(0,0,0,0.35)",
            transform: "translateZ(0)",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors touch-manipulation"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-5 sm:size-6" />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">Treino</h1>
            <p className="text-white/60 text-xs sm:text-sm truncate">Visão geral</p>
          </div>
          {instructorAvatarUrl ? (
            <img src={instructorAvatarUrl} alt="" className="size-9 sm:size-10 rounded-full object-cover border-2 border-white/20 shrink-0" />
          ) : (
            <div className="size-9 sm:size-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
              <Dumbbell className="size-4 sm:size-5 text-primary" />
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">
          {/* Hero único — sombra 3D elevada */}
          <div
            className="relative w-full aspect-[3/1] sm:aspect-[4/1] max-h-[140px] sm:max-h-[160px] rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-5 sm:mb-6"
            style={{
              boxShadow: "0 1px 0 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.25), 0 24px 56px -16px rgba(0,0,0,0.45)",
            }}
          >
            <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 h-12 sm:h-14 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, rgba(15, 20, 22, 0.7) 60%, rgba(15, 20, 22, 0.98) 100%)",
              }}
            />
          </div>

          {/* Nome do treino + meta + progresso — card 3D */}
          <div
            className="glass-card-3d rounded-2xl p-4 sm:p-5 lg:p-6 mb-5 sm:mb-6 border border-white/10 transition-shadow duration-300"
            style={{
              boxShadow: "0 1px 0 0 rgba(255,255,255,0.1), 0 6px 20px rgba(0,0,0,0.18), 0 18px 42px -10px rgba(0,0,0,0.32)",
              transform: "translateZ(8px)",
            }}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white leading-tight mb-3 sm:mb-4">
              {workout.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/65 mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 sm:size-4 text-primary shrink-0" />
                {workout.duration} min
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="size-3.5 sm:size-4 text-primary shrink-0" />
                {caloriesEstimated != null ? `${caloriesEstimated} kcal` : "— kcal"}
              </span>
              <span className="flex items-center gap-1.5">
                <Dumbbell className="size-3.5 sm:size-4 text-primary shrink-0" />
                {workout.exercises.length} exercícios
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] sm:text-xs text-white/55">
                <span>Progresso</span>
                <span>{completedCount}/{totalCount}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lista de exercícios */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70 mb-3 sm:mb-4">
              Sequência
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {workout.exercises.map((ex, idx) => (
                <Card
                  key={ex.id}
                  variant="glass"
                  className={`glass-card-3d border border-white/10 overflow-hidden rounded-2xl transition-all duration-300 touch-manipulation ${
                    onExerciseClick
                      ? "cursor-pointer hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.25),0_2px_0_0_rgba(255,255,255,0.08)] active:translate-y-0 active:scale-[0.99]" : ""
                  }`}
                  style={{
                    boxShadow: "0 1px 0 0 rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.15), 0 12px 32px -8px rgba(0,0,0,0.28)",
                  }}
                  onClick={() => onExerciseClick?.(ex, idx)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
                    <div
                      className="shrink-0 size-14 sm:size-16 rounded-xl overflow-hidden bg-black/30 aspect-square border border-white/5"
                      style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      <img
                        src={ex.image || IMAGES.WORKOUT_MAIN}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2">
                        {ex.name}
                      </p>
                      <p className="text-white/55 text-xs sm:text-sm mt-0.5">
                        {ex.sets} séries × {ex.reps} reps
                      </p>
                      {ex.technique && (
                        <span className="inline-block mt-1.5 text-[10px] font-medium uppercase tracking-wide text-primary/90 bg-primary/15 px-2 py-0.5 rounded-md">
                          {ex.technique}
                        </span>
                      )}
                    </div>
                    {onToggleExerciseDone && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleExerciseDone(ex.id);
                        }}
                        className={`shrink-0 size-9 sm:size-10 rounded-full border-2 flex items-center justify-center transition-colors touch-manipulation ${
                          ex.done
                            ? "bg-primary border-primary text-[#171512]"
                            : "border-white/25 text-white/40 hover:border-white/40 hover:text-white/60"
                        }`}
                        aria-label={ex.done ? "Desmarcar" : "Marcar como feito"}
                      >
                        {ex.done ? <Check className="size-4 sm:size-5" /> : null}
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            {workout.exercises.length === 0 && (
              <p className="text-white/50 text-sm py-8 text-center rounded-2xl border border-dashed border-white/10">
                Nenhum exercício neste treino.
              </p>
            )}
          </div>

          {/* CTA Iniciar treino — botão 3D */}
          <Button
            variant="default"
            size="lg"
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-2 mb-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(213,159,57,0.35),0_4px_0_0_rgba(0,0,0,0.15)] active:translate-y-0"
            style={{
              boxShadow: "0 2px 0 0 rgba(0,0,0,0.2), 0 6px 20px rgba(213,159,57,0.25)",
            }}
            onClick={onStartWorkout}
          >
            <PlayCircle className="size-5 sm:size-6 shrink-0" />
            Iniciar treino
          </Button>
        </main>
      </div>
    </div>
  );
}

/**
 * Container que injeta dados do contexto e navegação.
 * Mantém estado local de "done" por exercício para a progress bar e checkbox.
 */
const WorkoutOverview: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSparta();
  const workoutBase = user?.currentWorkout ?? getWorkoutFromStorage() ?? DEMO_WORKOUT;
  const [exerciseDone, setExerciseDone] = useState<Record<string, boolean>>({});

  const workout = useMemo(
    () => ({
      ...workoutBase,
      exercises: workoutBase.exercises.map((e) => ({
        ...e,
        done: exerciseDone[e.id] ?? e.done ?? false,
      })),
    }),
    [workoutBase, exerciseDone]
  );

  useEffect(() => {
    setWorkoutInStorage(workout);
  }, [workout]);

  const handleToggleDone = (exerciseId: string) => {
    setExerciseDone((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <Home />, label: "Início", onClick: () => navigate("/dashboard/student") },
    { icon: <Dumbbell />, label: "Treinos", onClick: () => navigate("/student/workouts") },
    { icon: <ChefHat />, label: "Dieta", onClick: () => navigate("/diet") },
    { icon: <User />, label: "Perfil", onClick: () => navigate("/dashboard/perfil") },
  ];

  return (
    <>
      <WorkoutOverviewScreen
        workout={workout}
        instructorAvatarUrl={IMAGES.INSTRUCTOR}
        onBack={() => navigate(-1)}
        onStartWorkout={() => navigate("/active-workout", { state: { workout, startTimer: true } })}
        onToggleExerciseDone={handleToggleDone}
        onExerciseClick={(_, index) => navigate("/active-workout", { state: { workout, startAt: index, startTimer: true } })}
      />
      <FloatingNav items={floatingNavItems} position="bottom-center" />
    </>
  );
};

export default WorkoutOverview;
