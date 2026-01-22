import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SpartaProvider } from './context/SpartaContext'; // O "Cérebro" do App

// Screens
import SplashScreen from './screens/SplashScreen';
import GoalSelection from './screens/GoalSelection';
import RoutineSettings from './screens/RoutineSettings';
import Dashboard from './screens/Dashboard';
import WorkoutOverview from './screens/WorkoutOverview';
import ActiveWorkout from './screens/ActiveWorkout';
import InstructorReview from './screens/InstructorReview';
import DailyDiet from './screens/DailyDiet';
import MealScan from './screens/MealScan';
import Subscription from './screens/Subscription';

const App: React.FC = () => {
  return (
    // 1. Envolvemos tudo no Provider para os dados funcionarem
    <SpartaProvider>
      <HashRouter>
        {/* 2. Usamos h-[100dvh] para corrigir altura em celulares */}
        <div className="max-w-md mx-auto h-[100dvh] bg-background-dark overflow-hidden relative shadow-2xl">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            {/* 3. Removemos as props manuais (user={user}), pois as telas já usam useSparta() */}
            <Route path="/goals" element={<GoalSelection />} />
            <Route path="/routine" element={<RoutineSettings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workout-overview" element={<WorkoutOverview />} />
            <Route path="/active-workout" element={<ActiveWorkout />} />
            <Route path="/instructor-review" element={<InstructorReview />} />
            <Route path="/diet" element={<DailyDiet />} />
            <Route path="/meal-scan" element={<MealScan />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </div>
      </HashRouter>
    </SpartaProvider>
  );
};

export default App;