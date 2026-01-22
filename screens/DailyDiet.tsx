import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../context/SpartaContext'; // Importe o Contexto

const DailyDiet: React.FC = () => {
  const navigate = useNavigate();
  // Busca as refeições do contexto
  const { meals } = useSparta();

  const totals = meals.reduce((acc, m) => ({
    calories: acc.calories + (m.completed ? m.calories : 0),
    protein: acc.protein + (m.completed ? m.protein : 0),
    carbs: acc.carbs + (m.completed ? m.carbs : 0),
    fat: acc.fat + (m.completed ? m.fat : 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const targets = { calories: 2400, protein: 180, carbs: 200, fat: 60 };

  return (
    <div className="bg-background-dark font-display antialiased min-h-screen text-white pb-24">
      <header className="fixed top-0 w-full z-50 bg-background-dark/95 backdrop-blur-sm border-b border-white/5 transition-all duration-200 max-w-md">
        <div className="flex items-center justify-between px-4 h-16">
          <button onClick={() => navigate('/dashboard')} className="text-white hover:text-primary transition-colors p-2 -ml-2 rounded-full active:bg-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-white text-lg font-bold tracking-tight uppercase">Nutrição Diária</h1>
          <button className="text-white hover:text-primary transition-colors p-2 -mr-2 rounded-full active:bg-white/10">
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pt-16 px-0 relative">
        <div className="flex justify-between items-center px-4 py-4 bg-background-dark sticky top-16 z-40 border-b border-white/5">
          <div className="flex gap-2 justify-center flex-1">
            <div className="flex flex-col items-center justify-center w-10 h-14 rounded bg-transparent opacity-50"><span className="text-[10px] font-bold text-white/60 uppercase">SEG</span><span className="text-sm font-medium text-white">22</span></div>
            <div className="flex flex-col items-center justify-center w-10 h-14 rounded bg-primary shadow-[0_0_15px_rgba(213,159,57,0.3)] scale-110"><span className="text-[10px] font-bold text-black/80 uppercase">Hoje</span><span className="text-lg font-bold text-black leading-none">24</span></div>
            <div className="flex flex-col items-center justify-center w-10 h-14 rounded bg-transparent opacity-50"><span className="text-[10px] font-bold text-white/60 uppercase">QUI</span><span className="text-sm font-medium text-white">25</span></div>
          </div>
        </div>

        <div className="px-4 space-y-6 mt-6">
          <div className="border border-primary/20 bg-primary/5 rounded relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1"><span className="material-symbols-outlined text-primary/20 text-6xl -mt-2 -mr-2">verified</span></div>
            <div className="p-4 flex items-start gap-4 relative z-10">
              <div className="flex flex-col gap-2 border-r border-primary/20 pr-4 items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">smart_toy</span>
                <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">A.I.</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1"><h3 className="text-xs font-bold text-primary tracking-wider uppercase">Certificado Digital</h3></div>
                <p className="text-sm text-white font-medium leading-tight">Plano sugerido por Inteligência Artificial</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-3 px-1">
              <h2 className="text-white text-base font-bold uppercase tracking-wide">Resumo de Macros</h2>
              <span className="text-xs text-white/40 font-medium tracking-wide">META DIÁRIA</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'PROT', val: totals.protein, target: targets.protein },
                { label: 'CARB', val: totals.carbs, target: targets.carbs },
                { label: 'GORD', val: totals.fat, target: targets.fat }
              ].map(macro => (
                <div key={macro.label} className="bg-surface-dark p-3 rounded border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/60 tracking-wider">{macro.label}</span>
                    <span className="text-[10px] text-primary font-bold">{Math.round((macro.val/macro.target)*100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-sm overflow-hidden">
                    <div className="h-full bg-primary rounded-sm transition-all" style={{width: `${Math.min((macro.val/macro.target)*100, 100)}%`}}></div>
                  </div>
                  <p className="text-xs text-white font-medium">{macro.val}g <span className="text-white/30">/ {macro.target}g</span></p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {meals.map((meal, index) => (
              <article key={meal.id || index} className="bg-surface-dark rounded border-l-4 border-primary shadow-lg relative overflow-hidden">
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                        {meal.name} <span className="text-xs font-normal text-white/40 bg-white/5 px-1.5 py-0.5 rounded">{meal.time}</span>
                      </h3>
                      <p className="text-xs text-primary mt-1 font-medium">{meal.calories} Kcal • {meal.completed ? 'Meta Atingida' : 'Pendente'}</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/5 w-full"></div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <div className={`size-4 rounded-sm border flex items-center justify-center ${meal.completed ? 'border-primary bg-primary' : 'border-white/20'}`}>
                        {meal.completed && <span className="material-symbols-outlined text-black text-xs font-bold">check</span>}
                      </div>
                      <span className={`text-sm ${meal.completed ? 'text-white/40 line-through' : 'text-white'}`}>{meal.protein}g Prot • {meal.carbs}g Carb • {meal.fat}g Gord</span>
                    </li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 w-full z-50 px-4 py-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent pointer-events-none max-w-md">
        <button 
          onClick={() => navigate('/meal-scan')} 
          className="w-full pointer-events-auto bg-primary text-black h-14 rounded font-bold uppercase tracking-wide text-sm shadow-[0_0_20px_rgba(213,159,57,0.3)] hover:shadow-[0_0_30px_rgba(213,159,57,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_task</span>Registrar Refeição
        </button>
      </div>
    </div>
  );
};

export default DailyDiet;