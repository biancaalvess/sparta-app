import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../context/SpartaContext'; // Importe o Contexto

const ActiveWorkout: React.FC = () => {
  const navigate = useNavigate();
  // Busca o treino e a função de finalizar do contexto
  const { user, completeWorkout } = useSparta();
  const workout = user?.currentWorkout;

  const [seconds, setSeconds] = useState(0);
  const [activeSet, setActiveSet] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // Se não houver treino, volta para o dashboard
  useEffect(() => {
    if (!workout) {
      navigate('/dashboard');
    }
  }, [workout, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Proteção contra renderização sem dados
  if (!workout) return null;

  const currentExercise = workout.exercises[exerciseIndex];

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSet = () => {
    if (activeSet < currentExercise.sets) {
      setActiveSet(prev => prev + 1);
    } else {
      if (exerciseIndex < workout.exercises.length - 1) {
        setExerciseIndex(prev => prev + 1);
        setActiveSet(1);
      } else {
        completeWorkout(); // Chama a função do contexto
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="bg-background-dark text-white font-display overflow-hidden h-full flex flex-col">
      <header className="flex-none bg-background-dark border-b border-white/5 z-20 relative">
        <div className="flex items-center justify-between p-4 pb-2">
          <button onClick={() => navigate('/workout-overview')} className="text-white flex size-10 items-center justify-center rounded bg-surface-dark hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-sm font-bold tracking-wider uppercase opacity-80">{workout.name}</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
              <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Sparta AI Active</span>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end"><p className="text-primary text-base font-bold font-mono tracking-wider">{formatTime(seconds)}</p></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide relative">
        <div className="relative w-full h-48 bg-surface-dark overflow-hidden group">
          <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" style={{backgroundImage: `url('${currentExercise.image}')`}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h1 className="text-white text-2xl font-extrabold uppercase leading-none tracking-tight drop-shadow-md">{currentExercise.name}</h1>
          </div>
        </div>

        <div className="px-4 mt-4">
          <div className="flex items-start gap-3 bg-surface-dark border-l-2 border-primary p-3 rounded-r-lg shadow-lg">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">smart_toy</span>
            <div><p className="text-xs font-bold text-primary uppercase mb-0.5">Sparta Insight</p><p className="text-sm text-gray-300 leading-snug">Foque na cadência controlada. Cadência sugerida: 3-0-1.</p></div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 mt-6 mb-2">
          <h3 className="text-white text-xl font-bold italic tracking-tighter uppercase">Série <span className="text-primary">{activeSet}</span> / {currentExercise.sets}</h3>
          <span className="text-xs font-medium text-text-secondary uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Meta: {currentExercise.reps} Reps</span>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4">
          <div className="group flex flex-col relative">
            <span className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-1 ml-1">Carga (KG)</span>
            <input className="w-full bg-surface-dark text-white text-3xl font-bold p-4 h-20 rounded-lg shadow-inner-strong border-b-2 border-transparent focus:border-primary focus:outline-none text-center font-display" type="number" defaultValue="20" />
          </div>
          <div className="group flex flex-col relative">
            <span className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-1 ml-1">Repetições</span>
            <input className="w-full bg-surface-dark text-white text-3xl font-bold p-4 h-20 rounded-lg shadow-inner-strong border-b-2 border-transparent focus:border-primary focus:outline-none text-center font-display" type="number" defaultValue="12" />
          </div>
        </div>

        <div className="px-4 mt-6">
          <div className="flex justify-between items-end mb-2"><span className="text-text-secondary text-xs font-bold uppercase tracking-wider">Esforço (RPE)</span><span className="text-primary text-sm font-bold">8 <span className="text-text-secondary font-normal text-xs">/ 10</span></span></div>
          <div className="flex justify-between gap-1 p-1 bg-surface-dark rounded-lg shadow-inner-strong">
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <button key={n} className={`flex-1 h-10 rounded text-[10px] font-bold transition-all ${n === 8 ? 'bg-primary text-black scale-105 shadow-glow' : 'text-text-secondary hover:text-white'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex-none fixed bottom-0 w-full z-30 bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-12 pb-6 px-4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-text-secondary text-sm">timer</span>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">Descanso sugerido: <span className="text-white">90s</span></span>
          </div>
        </div>
        <button 
          onClick={nextSet} 
          className="w-full relative group overflow-hidden rounded bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all duration-150 h-16 shadow-glow flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined text-black font-bold text-3xl">check</span>
          <span className="text-black text-lg font-extrabold uppercase tracking-widest">Concluir Série</span>
        </button>
      </footer>
    </div>
  );
};

export default ActiveWorkout;