import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FactoryProvider } from './context/FactoryContext';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/LandingPage';
import { FactorySetupWizard } from './pages/FactorySetupWizard';
import { DashboardPage } from './pages/DashboardPage';
import { EmissionsPage } from './pages/EmissionsPage';
import { HotspotsPage } from './pages/HotspotsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { RecommendationDetailPage } from './pages/RecommendationDetailPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { EnergyPage } from './pages/EnergyPage';
import { WastePage } from './pages/WastePage';
import { SimulatorPage } from './pages/SimulatorPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { AssistantPage } from './pages/AssistantPage';

export function App() {
  return (
    <FactoryProvider>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* 8-Step Factory Setup Wizard */}
          <Route path="/setup" element={<FactorySetupWizard />} />

          {/* Industrial Command Center App Shell Layout */}
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/emissions" element={<EmissionsPage />} />
            <Route path="/hotspots" element={<HotspotsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/recommendations/:id" element={<RecommendationDetailPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/energy" element={<EnergyPage />} />
            <Route path="/waste" element={<WastePage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
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
