import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FactoryProvider } from './context/FactoryContext';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/LandingPage';
import { FactorySetupWizard } from './pages/FactorySetupWizard';

// Streamlined Subtask Pages
import { RawMaterialDriversPage } from './pages/RawMaterialDriversPage';
import { RawMaterialCompositionPage } from './pages/RawMaterialCompositionPage';
import { RawMaterialComparisonPage } from './pages/RawMaterialComparisonPage';
import { ElectricityPage } from './pages/ElectricityPage';

import { DashboardPage } from './pages/DashboardPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { AssistantPage } from './pages/AssistantPage';

export function App() {
  return (
    <FactoryProvider>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* 6-Step Factory Setup Wizard */}
          <Route path="/setup" element={<FactorySetupWizard />} />

          {/* Industrial Command Center App Shell Layout */}
          <Route element={<AppShell />}>
            {/* Default Dashboard -> Raw Material Emission Drivers */}
            <Route path="/dashboard" element={<Navigate to="/raw-materials/drivers" replace />} />

            {/* Subtask 1: Raw Materials (3 Screens) */}
            <Route path="/raw-materials/drivers" element={<RawMaterialDriversPage />} />
            <Route path="/raw-materials/composition" element={<RawMaterialCompositionPage />} />
            <Route path="/raw-materials/comparison" element={<RawMaterialComparisonPage />} />

            {/* Subtask 2: Electricity */}
            <Route path="/electricity" element={<ElectricityPage />} />

            {/* Supporting pages */}
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </FactoryProvider>
  );
}

export default App;
