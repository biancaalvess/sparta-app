import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SpartaProvider } from './context/SpartaContext'; // Importe o Provider aqui

// Screens (Mantenha seus imports de telas como estavam)
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
  // Removemos os useState daqui, pois agora o SpartaProvider cuida disso!
  
  return (
    <SpartaProvider> 
      <HashRouter>
        <div className="max-w-md mx-auto h-screen bg-background-dark overflow-hidden relative shadow-2xl">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
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