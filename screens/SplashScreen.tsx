import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../constants/images';
// AJUSTE: O caminho baseado na sua pasta 'src/img'
import LogoSparta from '../assets/logo.png';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full w-full flex-col justify-between p-6 bg-background-dark text-white overflow-hidden">
      {/* Gradiente superior sutil */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#171512] to-transparent pointer-events-none z-0"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full mt-10">
        
        <div className="mb-12 relative group">
          {/* Fundo de luz (Glow) atrás do container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-56 bg-primary/20 blur-[60px] rounded-full"></div>
          
          {/* Container da Moldura */}
          <div className="relative z-10 p-5 rounded-3xl border-2 border-primary/40 bg-surface-dark/90 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(213,159,57,0.3)] animate-flicker ring-1 ring-primary/10">
            
            {/* AQUI ESTÁ A MUDANÇA: adicionei 'rounded-2xl' na imagem */}
            <img 
              src={LogoSparta} 
              alt="Logo Sparta" 
              className="w-60 h-auto object-contain drop-shadow-xl rounded-2xl"
            />
            
            {/* Detalhes sutis de "metal" na borda */}
            <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none"></div>
          </div>
        </div>
        
        <div className="text-center space-y-6">
          <div className="w-24 h-1.5 bg-primary/80 mx-auto rounded-full shadow-glow"></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base font-extrabold tracking-[0.2em] text-neutral-200 uppercase drop-shadow-sm">Treino e Nutrição.</p>
            <p className="text-sm md:text-base font-extrabold tracking-[0.2em] text-neutral-200 uppercase drop-shadow-sm">Inteligência e Disciplina.</p>
          </div>
        </div>
      </div>

      <div className="w-full pb-8 z-10 flex flex-col items-center gap-6">
        <button 
          onClick={() => navigate('/goals')} 
          className="group relative w-full h-14 bg-metal-gradient rounded-lg flex items-center justify-center shadow-[0px_4px_20px_rgba(213,159,57,0.4)] active:scale-[0.98] transition-all duration-200 overflow-hidden cursor-pointer border-t border-white/20"
        >
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
          <span className="text-background-dark text-lg font-black tracking-widest uppercase z-10 flex items-center gap-3 drop-shadow-sm">
            INICIAR JORNADA <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </span>
        </button>
        <div className="flex items-center justify-center gap-2 opacity-50 mix-blend-plus-lighter">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow"></div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Sparta AI v1.0 Ready</p>
        </div>
      </div>

      {/* Marca d'água de fundo */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay bg-center bg-no-repeat scale-150" style={{backgroundImage: `url('${IMAGES.LOGO_SHIELD}')`}}></div>
    </div>
  );
};

export default SplashScreen;