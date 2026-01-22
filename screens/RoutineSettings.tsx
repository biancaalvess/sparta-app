import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../context/SpartaContext'; // Importe o Contexto
import { ExperienceLevel } from '../types';
import { generateWorkoutPlan } from '../services/geminiService';

const RoutineSettings: React.FC = () => {
  const navigate = useNavigate();
  // Substituímos props pelo hook useSparta
  const { user, updateUser } = useSparta(); 
  const [loading, setLoading] = useState(false);

  const handleGenerateProtocol = async () => {
    setLoading(true);
    try {
      const plan = await generateWorkoutPlan(user.goal, user.level, user.frequency);
      updateUser({ currentWorkout: plan }); // Usando updateUser
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao gerar treino:", error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-background-dark flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-bold uppercase">Criando Protocolo...</h2>
        <p className="text-sm opacity-60 mt-2">A I.A. está analisando seus objetivos.</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-background-dark text-white">
      <header className="flex items-center bg-background-dark p-4 pb-2 justify-between sticky top-0 z-20 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-white/60 hover:text-primary transition-colors flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 active:bg-white/10">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-xs font-bold tracking-[0.15em] uppercase opacity-80">Parâmetros</h2>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-24 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold uppercase leading-none mb-2">Sua<br/><span className="text-primary">Rotina</span></h1>
          <p className="text-white/50 text-sm">Quantos dias você pode treinar?</p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-6 gap-2">
            {[2,3,4,5,6,7].map(num => (
              <label key={num} className="cursor-pointer group relative">
                <input 
                  type="radio" 
                  name="days" 
                  className="peer sr-only"
                  checked={user.frequency === num}
                  onChange={() => updateUser({ frequency: num })}
                />
                <div className="h-14 rounded bg-surface-dark border border-white/10 peer-checked:border-primary peer-checked:text-primary flex items-center justify-center transition-all">
                  <span className="font-bold text-lg font-mono">{num}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-90">Nível Técnico</h2>
          <div className="flex flex-col gap-3">
            {[
              { id: ExperienceLevel.BEGINNER, label: 'Iniciante', icon: 'stat_minus_1' },
              { id: ExperienceLevel.INTERMEDIATE, label: 'Intermediário', icon: 'equal' },
              { id: ExperienceLevel.ADVANCED, label: 'Avançado', icon: 'stat_1' }
            ].map(level => (
              <label key={level.id} className="cursor-pointer relative">
                <input 
                  type="radio" 
                  name="level" 
                  className="peer sr-only"
                  checked={user.level === level.id}
                  onChange={() => updateUser({ level: level.id })}
                />
                <div className="p-4 rounded bg-surface-dark border border-white/10 peer-checked:border-primary flex items-center gap-4 transition-all">
                  <span className="material-symbols-outlined text-white/50">{level.icon}</span>
                  <span className="font-bold uppercase text-sm">{level.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 w-full p-6 bg-background-dark border-t border-white/5">
        <button onClick={handleGenerateProtocol} className="w-full bg-primary text-black font-bold uppercase py-4 rounded-lg">
          Gerar Treino
        </button>
      </div>
    </div>
  );
};

export default RoutineSettings;