import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../../../shared/context/SpartaContext';
import { IMAGES } from '../../../shared/constants/images';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSparta();

  const handleLogout = () => {
    // TODO: Limpar tokens do LocalStorage
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white uppercase tracking-wide px-4 md:px-0">Meu Perfil</h1>

      <div className="bg-surface-dark border border-white/5 rounded-xl p-6 flex items-center gap-4 mx-4 md:mx-0">
        <div className="size-20 rounded-full bg-cover border-2 border-primary" style={{backgroundImage: `url('${IMAGES.AVATAR_PLACEHOLDER}')`}}></div>
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400 text-sm">Membro Ativo</p>
        </div>
      </div>

      <div className="mx-4 md:mx-0 bg-surface-dark border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <span className="text-gray-300">Objetivo</span>
          <span className="text-primary font-bold">{user.goal}</span>
        </div>
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <span className="text-gray-300">Nível</span>
          <span className="text-white font-bold">{user.level}</span>
        </div>
        <div className="p-4 flex justify-between items-center">
          <span className="text-gray-300">Frequência</span>
          <span className="text-white font-bold">{user.frequency}x / semana</span>
        </div>
      </div>

      <div className="px-4 md:px-0">
        <button 
            onClick={handleLogout}
            className="w-full border border-red-500/50 text-red-500 py-3 rounded-lg font-bold hover:bg-red-500/10 transition-colors"
        >
            SAIR DO SISTEMA
        </button>
      </div>
    </div>
  );
};

export default Profile;