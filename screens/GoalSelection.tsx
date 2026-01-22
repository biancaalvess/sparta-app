import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../context/SpartaContext'; // Hook do Contexto
import { Goal } from '../types';
import { IMAGES } from '../constants/images';

const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
  // Buscando dados e função do contexto
  const { user, updateUser } = useSparta();

  const goals = [
    { id: Goal.WEIGHT_LOSS, title: 'Emagrecimento', desc: 'Queima calórica acelerada', img: IMAGES.GOAL_WEIGHT_LOSS },
    { id: Goal.HYPERTROPHY, title: 'Hipertrofia', desc: 'Ganho de massa e força bruta', img: IMAGES.GOAL_HYPERTROPHY },
    { id: Goal.CONDITIONING, title: 'Condicionamento', desc: 'Resistência e saúde funcional', img: IMAGES.GOAL_CONDITIONING }
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background-dark">
      <header className="relative z-10 flex flex-col px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 text-white transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex gap-2">
            <div className="h-1.5 w-8 rounded-full bg-primary shadow-glow"></div>
            <div className="h-1.5 w-2 rounded-full bg-surface-dark border border-white/10"></div>
            <div className="h-1.5 w-2 rounded-full bg-surface-dark border border-white/10"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-white text-[32px] font-extrabold uppercase leading-[1.1] tracking-wide">Qual seu<br/><span className="text-primary">objetivo?</span></h1>
          <p className="text-[#B0B0B0] text-sm font-medium leading-relaxed max-w-[90%]">Defina sua meta principal. A I.A. ajustará sua rota para resultados de alta performance.</p>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 pb-24 space-y-4 overflow-y-auto no-scrollbar">
        {goals.map((goal) => (
          <label key={goal.id} className="group relative flex flex-col justify-end h-40 w-full rounded-lg cursor-pointer overflow-hidden transition-all duration-300 border-2 border-white/5 bg-surface-dark hover:border-white/20 active:scale-[0.98]">
            <input 
              className="peer sr-only" 
              name="goal" 
              type="radio" 
              value={goal.id} 
              checked={user?.goal === goal.id} 
              onChange={() => updateUser({ goal: goal.id })} // Atualiza via Contexto
            />
            <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-[50%] transition-all duration-500 scale-100 group-hover:scale-105" style={{backgroundImage: `url('${goal.img}')`}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/5 transition-all rounded-lg z-20 pointer-events-none"></div>
            <div className="relative z-10 p-5 flex items-end justify-between w-full">
              <div className="flex flex-col gap-1">
                <span className={`text-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-opacity duration-300 translate-y-2 ${user?.goal === goal.id ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>Selecionado</span>
                <h3 className="text-white text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{goal.title}</h3>
                <p className="text-gray-300 text-xs font-medium tracking-wide">{goal.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-metal-edge bg-black/40 backdrop-blur-sm ${user?.goal === goal.id ? 'border-primary bg-primary' : 'border-gray-500'}`}>
                <span className={`material-symbols-outlined text-[16px] text-black font-bold scale-50 transition-all ${user?.goal === goal.id ? 'opacity-100 scale-100' : 'opacity-0'}`}>check</span>
              </div>
            </div>
          </label>
        ))}
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-30">
        <button 
          onClick={() => navigate('/routine')} 
          className="relative w-full overflow-hidden group rounded bg-primary py-4 px-6 transition-all hover:bg-[#b0832f] active:scale-[0.99] shadow-[0_0_20px_rgba(213,159,57,0.3)]"
        >
          <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-black/30"></div>
          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-black/30"></div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-background-dark font-black text-base uppercase tracking-[0.15em]">Confirmar Objetivo</span>
            <span className="material-symbols-outlined text-background-dark text-lg font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </button>
      </footer>
    </div>
  );
};

export default GoalSelection;