import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserState, Meal, Goal, ExperienceLevel, Workout } from '../types';

// Mock Inicial
const DEFAULT_WORKOUT: Workout = {
  id: 'default-1',
  name: "HIPERTROFIA PUSH A",
  focalMuscles: "PEITORAL & TRÍCEPS",
  duration: 45,
  exercises: [
    { 
      id: '1', 
      name: "SUPINO RETO", 
      sets: 4, 
      reps: "8-10", 
      image: "https://gymvisual.com/img/p/6/0/3/0/6030.jpg" 
    },
    { 
      id: '2', 
      name: "CRUCIFIXO", 
      sets: 3, 
      reps: "12", 
      image: "https://gymvisual.com/img/p/5/5/5/8/5558.jpg" 
    }
  ]
};

// Interface que define o que o contexto exporta
interface SpartaContextData {
  user: UserState;
  meals: Meal[];
  updateUser: (data: Partial<UserState>) => void;
  addMeal: (meal: Meal) => void;
  toggleMeal: (id: string) => void;
  completeWorkout: () => void;
}

// Criação do Contexto
const SpartaContext = createContext<SpartaContextData>({} as SpartaContextData);

// O Provider que vai envolver o App
export const SpartaProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // 1. Carrega do LocalStorage ou usa valores padrão
  const [user, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('@sparta:user');
    return saved ? JSON.parse(saved) : {
      name: "ATLETA",
      goal: Goal.HYPERTROPHY,
      frequency: 4,
      level: ExperienceLevel.INTERMEDIATE,
      currentWorkout: DEFAULT_WORKOUT
    };
  });

  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('@sparta:meals');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Salva no LocalStorage sempre que houver mudança
  useEffect(() => {
    localStorage.setItem('@sparta:user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('@sparta:meals', JSON.stringify(meals));
  }, [meals]);

  // Funções de manipulação
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
    // Lógica futura: Salvar no histórico
    console.log("Treino finalizado");
  };

  return (
    <SpartaContext.Provider value={{ user, meals, updateUser, addMeal, toggleMeal, completeWorkout }}>
      {children}
    </SpartaContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useSparta = () => useContext(SpartaContext);