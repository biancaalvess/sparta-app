export enum Goal {
    WEIGHT_LOSS = 'WEIGHT_LOSS',
    HYPERTROPHY = 'HYPERTROPHY',
    CONDITIONING = 'CONDITIONING',
}

export enum ExperienceLevel {
    BEGINNER = 'Iniciante',
    INTERMEDIATE = 'Intermediário',
    ADVANCED = 'Avançado',
}

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: string;
    image?: string;
    done?: boolean; // Para marcar durante o treino
}

export interface Workout {
    id: string;
    name: string;
    focalMuscles: string;
    duration: number;
    exercises: Exercise[];
}

export interface Meal {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
    completed: boolean;
}

export interface UserState {
    name: string;
    goal: Goal;
    frequency: number;
    level: ExperienceLevel;
    currentWorkout?: Workout;
  history?: any[]; // Histórico de treinos realizados
}