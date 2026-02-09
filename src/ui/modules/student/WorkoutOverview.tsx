import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../../../shared/context/SpartaContext';
import { IMAGES } from '../../../shared/constants/images';

const WorkoutOverview: React.FC = () => {
  const navigate = useNavigate();
  // Busca o treino atual do contexto
  const { user } = useSparta();
  const workout = user?.currentWorkout;

  if (!workout) return <div className="p-10 text-white">Carregando Treino...</div>;

  return (
    <div className="relative flex h-full w-full flex-col bg-[#171512] overflow-hidden">
      <header className="flex items-center bg-[#1a1a1a] p-4 pb-2 justify-between sticky top-0 z-20 border-b border-border-dark/50 backdrop-blur-md bg-opacity-90">
        <button onClick={() => navigate('/dashboard')} className="text-white hover:text-primary transition-colors flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight uppercase">Visão Geral do Treino</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 p-4">
        <div className="relative w-full rounded-xl overflow-hidden border border-border-dark group shadow-metallic mb-6">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: `url('${IMAGES.SPLASH_BG}')`}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-[#1a1a1a]/40 z-0"></div>
          <div className="absolute inset-0 bg-grid-pattern z-0"></div>
          <div className="relative z-10 p-5 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <div className="flex items-center gap-1.5 bg-primary/20 border border-primary/30 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-primary tracking-wide">
                <span className="material-symbols-outlined text-[16px]">neurology</span>TREINO IA
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white leading-none tracking-tight uppercase">{workout.name}</h1>
              <p className="text-gray-300 text-sm font-light tracking-wide flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>FOCO: {workout.focalMuscles}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg p-3 border border-border-dark bg-surface-dark shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl mb-1">timer</span>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">TEMPO</p>
            <p className="text-white text-lg font-bold leading-none">{workout.duration} MIN</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg p-3 border border-border-dark bg-surface-dark shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl mb-1">ecg_heart</span>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">INTENSIDADE</p>
            <p className="text-white text-lg font-bold leading-none">ALTA</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg p-3 border border-border-dark bg-surface-dark shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl mb-1">fitness_center</span>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">VOLUME</p>
            <p className="text-white text-lg font-bold leading-none">{workout.exercises.length} EXER.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end px-1 mb-1"><h3 className="text-white text-sm font-bold tracking-wider uppercase">Sequência</h3><span className="text-xs text-primary font-medium">Lista Completa</span></div>
          {workout.exercises.map((ex, idx) => (
            <div key={ex.id || idx} onClick={() => navigate('/active-workout')} className="cursor-pointer relative group overflow-hidden rounded-lg bg-surface-dark border border-border-dark shadow-sm hover:border-primary/40 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex items-center gap-4 p-3">
                <div className="relative shrink-0 size-16 rounded-md overflow-hidden bg-black">
                  <img className="w-full h-full object-cover opacity-80" src={ex.image || IMAGES.WORKOUT_MAIN} alt={ex.name} />
                  <div className="absolute inset-0 bg-primary/10"></div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                  <p className="text-white text-base font-bold leading-tight uppercase truncate">{ex.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#1a1a1a] px-2 py-0.5 rounded text-xs font-mono text-primary border border-white/5">{ex.sets} SÉRIES</span>
                    <span className="text-gray-300 text-xs font-mono">{ex.reps} REPS</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 z-30 w-full max-w-md bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-transparent pt-12 pb-6 px-4">
        <button 
          onClick={() => navigate('/active-workout')} 
          className="w-full bg-primary hover:bg-primary-dark text-[#1a1a1a] active:scale-[0.98] transition-all duration-150 rounded-lg h-14 font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(213,159,57,0.3)] border-t border-white/20"
        >
          <span className="material-symbols-outlined">play_arrow</span>INICIAR TREINO
        </button>
      </footer>
    </div>
  );
};

export default WorkoutOverview;