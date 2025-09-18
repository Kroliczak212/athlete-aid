import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import CRMDashboard from "./pages/CRMDashboard";
import ClubDashboard from "./pages/ClubDashboard";
import TrainingPlans from "./pages/TrainingPlans";
import TrainingPlanDetails from "./pages/TrainingPlanDetails";
import AthleteProfile from "./pages/AthleteProfile";
import AthleteDashboard from "./pages/AthleteDashboard";
import TemplateDetails from "./pages/TemplateDetails";
import AthleteDetailAnalysis from "./pages/AthleteDetailAnalysis";
import AIAnalyzer from "./pages/AIAnalyzer";
import MotionAnalysis from "./pages/MotionAnalysis";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes - without dashboard layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard routes - with layout */}
          <Route path="/*" element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<CRMDashboard />} />
                <Route path="/club" element={<ClubDashboard />} />
                <Route path="/athlete/:id" element={<AthleteProfile />} />
                <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
                <Route path="/training" element={<TrainingPlans />} />
                <Route path="/training/plan/:id" element={<TrainingPlanDetails />} />
                <Route path="/training/template/:id" element={<TemplateDetails />} />
                <Route path="/analyzer" element={<AIAnalyzer />} />
                <Route path="/analyzer/athlete/:id" element={<AthleteDetailAnalysis />} />
                <Route path="/motion" element={<MotionAnalysis />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
