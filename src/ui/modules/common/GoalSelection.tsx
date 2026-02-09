import React from 'react';
import { useNavigate } from 'react-router-dom';
// 🔥 CORREÇÃO: Caminho atualizado para a pasta shared
import { useSparta } from '../../../shared/context/SpartaContext';
import { Goal } from '../../../shared/types';
import { IMAGES } from '../../../shared/constants/images';

const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
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
          <h1 className="text-white text-[32px] font-extrabold uppercase leading-[1.1] tracking-wide">Qual seu<br/><span className="text-primary">objetivo?</span></h1>
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
              onChange={() => updateUser({ goal: goal.id })} 
            />
            <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-[50%] transition-all duration-500 scale-100 group-hover:scale-105" style={{backgroundImage: `url('${goal.img}')`}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/5 transition-all rounded-lg z-20 pointer-events-none"></div>
            <div className="relative z-10 p-5 flex items-end justify-between w-full">
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{goal.title}</h3>
                <p className="text-gray-300 text-xs font-medium tracking-wide">{goal.desc}</p>
              </div>
              {user?.goal === goal.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-black font-bold">check</span>
                </div>
              )}
            </div>
          </label>
        ))}
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-4 bg-background-dark z-30">
        <button 
          onClick={() => navigate('/routine')} 
          className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-lg"
        >
          Confirmar Objetivo
        </button>
      </footer>
    </div>
  );
};

export default GoalSelection;