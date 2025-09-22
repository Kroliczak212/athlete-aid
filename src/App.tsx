import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Suspense, lazy } from 'react';

const CRMDashboard = lazy(() => import('./pages/CRMDashboard'));
const ClubDashboard = lazy(() => import('./pages/ClubDashboard'));
const TrainingPlans = lazy(() => import('./pages/TrainingPlans'));
const TrainingPlanDetails = lazy(() => import('./pages/TrainingPlanDetails'));
const AthleteProfile = lazy(() => import('./pages/AthleteProfile'));
const AthleteDashboard = lazy(() => import('./pages/AthleteDashboard'));
const TemplateDetails = lazy(() => import('./pages/TemplateDetails'));
const AIAnalyzer = lazy(() => import('./pages/AIAnalyzer'));
const AthleteDetailAnalysis = lazy(() => import('./pages/AthleteDetailAnalysis'));
const AthleteComparison = lazy(() => import('./pages/AthleteComparison'));
const WeeklyReport = lazy(() => import('./pages/WeeklyReport'));
const TrainingZones = lazy(() => import('./pages/TrainingZones'));
const TrainingDetails = lazy(() => import('./pages/TrainingDetails'));
const MotionAnalysis = lazy(() => import('./pages/MotionAnalysis'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="p-6">Ładowanie…</div>}>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected app layout */}
                <Route element={<DashboardLayout />}>
                  <Route index element={<CRMDashboard />} />
                  <Route path="/club" element={<ClubDashboard />} />
                  <Route path="/athlete/:id" element={<AthleteProfile />} />
                  <Route path="/athlete-dashboard" element={<AthleteDashboard />} />

                  {/* Training */}
                  <Route path="/training" element={<TrainingPlans />} />
                  <Route path="/training/plan/:id" element={<TrainingPlanDetails />} />
                  <Route path="/training/template/:id" element={<TemplateDetails />} />
                  <Route path="/training/:id" element={<TrainingDetails />} />

                  {/* Analyzer */}
                  <Route path="/analyzer" element={<AIAnalyzer />} />
                  <Route path="/analyzer/athlete/:id" element={<AthleteDetailAnalysis />} />
                  <Route path="/analyzer/compare" element={<AthleteComparison />} />
                  <Route path="/analyzer/weekly-report" element={<WeeklyReport />} />
                  <Route path="/analyzer/training-zones" element={<TrainingZones />} />
                  <Route path="/motion" element={<MotionAnalysis />} />

                  {/* 404 inside layout */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>

          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
