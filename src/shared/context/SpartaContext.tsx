import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserState, Meal, Goal, ExperienceLevel, Workout, Exercise } from '../types';

interface SpartaContextData {
  user: UserState;
  meals: Meal[];
  updateUser: (data: Partial<UserState>) => void;
  addMeal: (meal: Meal) => void;
  toggleMeal: (id: string) => void;
  completeWorkout: () => void;
  swapExercise: (originalExerciseId: string, newExercise: Exercise) => void;
}

const SpartaContext = createContext<SpartaContextData>({} as SpartaContextData);

export const SpartaProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUserState] = useState<UserState>(() => {
    // Tenta recuperar do storage
    const saved = localStorage.getItem('@sparta:user');
    if (saved) {
      return JSON.parse(saved);
    }
    // 🔥 ESTADO INICIAL LIMPO (Sem mocks forçados)
    return {
      isAuthenticated: false,
      name: "",
      role: null,
      token: null,
      level: ExperienceLevel.BEGINNER, // Padrão seguro
      frequency: 3,
      goal: Goal.HYPERTROPHY
    };
  });

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (user.isAuthenticated) {
        localStorage.setItem('@sparta:user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (data: Partial<UserState>) => {
    setUserState(prev => ({ ...prev, ...data }));
  };

  const addMeal = (meal: Meal) => {
    setMeals(prev => [...prev, meal]);
  };

  const toggleMeal = (id: string) => {
    setMeals(prev => prev.map(m => m.id === id ? {...m, completed: !m.completed} : m));
  };

  const completeWorkout = () => {
    console.log("Treino finalizado");
  };

  const swapExercise = (originalExerciseId: string, newExercise: Exercise) => {
    // Lógica futura de troca
  };

  return (
    <SpartaContext.Provider value={{ user, meals, updateUser, addMeal, toggleMeal, completeWorkout, swapExercise }}>
      {children}
    </SpartaContext.Provider>
  );
};

export const useSparta = () => useContext(SpartaContext);