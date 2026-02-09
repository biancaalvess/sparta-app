import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../../../shared/context/SpartaContext';
import { ArrowLeft, Clock, CheckCircle2, Trophy, RefreshCw, X } from 'lucide-react';

const ActiveWorkout: React.FC = () => {
  const navigate = useNavigate();
  const { user, swapExercise, completeWorkout } = useSparta();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [swappingExerciseId, setSwappingExerciseId] = useState<string | null>(null);

  if (!user.currentWorkout) return <div>Carregando treino...</div>;

  const toggleExercise = (id: string) => {
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(exId => exId !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    completeWorkout();
    navigate('/dashboard');
  };

  const handleSwap = (originalId: string, newExercise: Exercise) => {
    swapExercise(originalId, newExercise);
    setSwappingExerciseId(null); // Fecha o modal
  };

  // Calcula progresso
  const progress = Math.round((completedExercises.length / user.currentWorkout.exercises.length) * 100);

  return (
    <div className="min-h-screen bg-background-dark pb-24 relative">
      {/* Header Fixo */}
      <div className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <span className="font-lexend text-white font-bold tracking-wide">TREINO ATIVO</span>
          <div className="w-6" />
        </div>

        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl font-bold text-sparta-gold">{user.currentWorkout.name}</h1>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{user.currentWorkout.focalMuscles}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Clock size={14} className="text-sparta-gold" />
                <span className="text-xs font-mono text-white">{user.currentWorkout.duration} min</span>
            </div>
        </div>
      </div>

      {/* Lista de Exercícios */}
      <div className="p-4 space-y-4">
        {user.currentWorkout.exercises.map((exercise) => {
            const isDone = completedExercises.includes(exercise.id);
            
            return (
                <div key={exercise.id} className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isDone 
                    ? 'bg-green-900/20 border-green-500/30 opacity-75' 
                    : 'bg-white/5 border-white/10'
                }`}>
                    {/* Imagem de Fundo (Opcional) */}
                    {exercise.image && !isDone && (
                        <div className="absolute inset-0 opacity-10 bg-center bg-cover" style={{ backgroundImage: `url(${exercise.image})` }} />
                    )}

                    <div className="relative p-5">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="inline-block text-[10px] font-bold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded mb-1 uppercase">
                                    {exercise.muscleGroup}
                                </span>
                                <h3 className={`text-lg font-bold font-lexend ${isDone ? 'text-green-400 line-through' : 'text-white'}`}>
                                    {exercise.name}
                                </h3>
                            </div>
                            
                            <button 
                                onClick={() => toggleExercise(exercise.id)}
                                className={`p-3 rounded-full transition-all active:scale-95 ${
                                    isDone ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-400 hover:bg-sparta-gold hover:text-black'
                                }`}
                            >
                                <CheckCircle2 size={24} fill={isDone ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 text-gray-400 text-sm font-mono mb-4">
                            <div><strong className="text-white text-lg">{exercise.sets}</strong> SÉRIES</div>
                            <div className="w-px h-4 bg-white/10"></div>
                            <div><strong className="text-white text-lg">{exercise.reps}</strong> REPS</div>
                        </div>

                        {/* Botão de Troca (Só aparece se tiver opções e não estiver feito) */}
                        {!isDone && exercise.replacementOptions && exercise.replacementOptions.length > 0 && (
                            <button 
                                onClick={() => setSwappingExerciseId(exercise.id)}
                                className="flex items-center gap-2 text-xs text-sparta-gold/80 hover:text-sparta-gold transition-colors py-2"
                            >
                                <RefreshCw size={12} />
                                Trocar Exercício (Aparelho Ocupado)
                            </button>
                        )}
                    </div>
                </div>
            );
        })}
      </div>

      {/* Botão Finalizar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark to-transparent">
        <div className="max-w-md mx-auto">
            <button 
                onClick={handleFinish}
                disabled={progress < 100}
                className={`w-full py-4 rounded-xl font-bold font-lexend tracking-widest flex items-center justify-center gap-2 transition-all ${
                    progress === 100 
                    ? 'bg-sparta-gold text-black shadow-[0_0_20px_rgba(213,159,57,0.4)]' 
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
            >
                <Trophy size={20} />
                FINALIZAR TREINO ({progress}%)
            </button>
        </div>
      </div>

      {/* MODAL DE TROCA */}
      {swappingExerciseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1e1c19] w-full max-w-sm rounded-2xl border border-sparta-gold/30 shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-white font-bold font-lexend">Trocar Exercício</h3>
                    <button onClick={() => setSwappingExerciseId(null)} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-400 mb-2">O aparelho está ocupado? Escolha uma alternativa para o mesmo grupo muscular:</p>
                    
                    {user.currentWorkout.exercises
                        .find(e => e.id === swappingExerciseId)
                        ?.replacementOptions?.map(option => (
                        <button 
                            key={option.id}
                            onClick={() => handleSwap(swappingExerciseId, option)}
                            className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-sparta-gold/50 hover:bg-white/10 transition-all group"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-white font-bold text-sm group-hover:text-sparta-gold">{option.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{option.sets} Séries • {option.reps} Reps</p>
                                </div>
                                <RefreshCw size={16} className="text-gray-600 group-hover:text-sparta-gold" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ActiveWorkout;