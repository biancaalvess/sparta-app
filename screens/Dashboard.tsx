import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../context/SpartaContext'; // Importando do lugar certo
import { IMAGES } from '../constants/images';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // AQUI ESTÁ A MÁGICA: Buscamos user e meals do contexto, não das props
  const { user, meals } = useSparta();
  
  // Evita tela preta: se o user ainda não carregou, mostra aviso simples
  if (!user) return <div className="p-10 text-white">Carregando Perfil...</div>;

  const totalCalories = meals.reduce((acc, m) => acc + (m.completed ? m.calories : 0), 0);
  const targetCalories = 2400;

  return (
    <div className="bg-background-dark text-white min-h-screen relative pb-24 font-display">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center p-4 pb-3 justify-between max-w-md mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary/20" style={{backgroundImage: `url('${IMAGES.AVATAR_PLACEHOLDER}')`}}></div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#1A1A1A] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-primary tracking-widest uppercase">Status: Ativo</span>
              <h2 className="text-white text-lg font-bold leading-none tracking-tight">BOM DIA, {user.name}</h2>
            </div>
          </div>
          <button className="relative flex items-center justify-center size-10 rounded-full bg-surface-dark border border-white/5 text-white hover:bg-white/5">
            <span className="material-symbols-outlined text-white/80">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="flex flex-col w-full max-w-md mx-auto pt-[76px] px-4 space-y-6">
        <div className="flex justify-between items-end pt-2">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tighter text-white uppercase">Visão Geral</h3>
            <p className="text-text-secondary text-sm font-medium">Protocolo Ativo</p>
          </div>
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">bolt</span>Alta Performance
          </div>
        </div>

        <section className="relative group cursor-pointer" onClick={() => navigate('/workout-overview')}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/40 rounded-xl opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex flex-col bg-surface-dark rounded-xl overflow-hidden shadow-chiseled border-t border-white/10 border-b-2 border-b-black/40">
            <div className="h-40 w-full relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url('${IMAGES.WORKOUT_MAIN}')`}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-transparent"></div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-bold text-white tracking-wide uppercase">Ao vivo</span>
              </div>
            </div>
            <div className="px-5 pb-5 -mt-10 relative z-10 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-primary text-xs font-bold tracking-[0.15em] uppercase">Treino Sugerido</span></div>
                <h2 className="text-2xl font-bold text-white leading-tight uppercase tracking-tight">{user.currentWorkout?.name || "CARREGANDO..."}</h2>
                <div className="flex items-center gap-4 mt-2 text-text-secondary text-sm">
                  <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">schedule</span>{user.currentWorkout?.duration || 0} Min</div>
                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">fitness_center</span>Foco: {user.currentWorkout?.focalMuscles || "VÁRIOS"}</div>
                </div>
              </div>
              <button className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all h-12 rounded-lg flex items-center justify-center gap-2 text-[#171512] font-bold text-base uppercase tracking-wide shadow-lg">
                <span className="material-symbols-outlined filled">play_arrow</span>Começar Agora
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div onClick={() => navigate('/diet')} className="bg-surface-dark p-4 rounded-xl shadow-chiseled border border-white/5 flex flex-col justify-between h-[160px] relative overflow-hidden cursor-pointer">
            <div className="absolute top-0 right-0 p-3 opacity-10"><span className="material-symbols-outlined text-6xl">restaurant</span></div>
            <div>
              <p className="text-text-secondary text-xs font-bold tracking-wider uppercase mb-1">Dieta do Dia</p>
              <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-white">{totalCalories}</span><span className="text-sm text-text-secondary">/ {targetCalories}</span></div>
              <p className="text-xs text-primary font-medium mt-1">Kcal Consumidas</p>
            </div>
            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden mt-4">
              <div className="bg-gradient-to-r from-primary to-yellow-200 h-full rounded-full transition-all" style={{width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%`}}></div>
            </div>
          </div>

          <div onClick={() => navigate('/instructor-review')} className="bg-surface-dark p-4 rounded-xl shadow-chiseled border border-white/5 flex flex-col justify-between h-[160px] cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-xs font-bold tracking-wider uppercase mb-1">Frequência</p>
                <span className="text-2xl font-bold text-white">4/5</span>
              </div>
              <div className="bg-green-500/10 text-green-500 rounded p-1"><span className="material-symbols-outlined text-[20px]">trending_up</span></div>
            </div>
            <div className="flex gap-1.5 mt-auto">
              {['S', 'T', 'Q', 'Q', 'S'].map((day, i) => (
                <div key={i} className={`size-6 rounded flex items-center justify-center text-[10px] font-bold ${i < 4 ? 'bg-primary text-black' : 'bg-white/10 border border-white/10 text-white/40'}`}>
                  {day}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-text-secondary mt-2 font-mono">Disciplina: <span className="text-white font-bold">90%</span></p>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-white/5 pt-2 pb-6 px-6 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-primary w-16 group">
            <div className="bg-primary/10 rounded-full px-4 py-1"><span className="material-symbols-outlined filled text-[24px]">grid_view</span></div>
            <span className="text-[10px] font-bold tracking-wide">Home</span>
          </button>
          <button onClick={() => navigate('/workout-overview')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-white transition w-16">
            <div className="px-4 py-1"><span className="material-symbols-outlined text-[24px]">fitness_center</span></div>
            <span className="text-[10px] font-medium tracking-wide">Treino</span>
          </button>
          <button onClick={() => navigate('/diet')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-white transition w-16">
            <div className="px-4 py-1"><span className="material-symbols-outlined text-[24px]">restaurant_menu</span></div>
            <span className="text-[10px] font-medium tracking-wide">Dieta</span>
          </button>
          <button onClick={() => navigate('/subscription')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-white transition w-16">
            <div className="px-4 py-1"><span className="material-symbols-outlined text-[24px]">person</span></div>
            <span className="text-[10px] font-medium tracking-wide">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;