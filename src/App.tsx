import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import QuestionBank from "@/pages/admin/QuestionBank";
import ExamManagement from "@/pages/admin/ExamManagement";
import CreateExam from "@/pages/admin/CreateExam";
import CandidateManagement from "@/pages/admin/CandidateManagement";
import Calendar from "@/pages/admin/Calendar";
import BatchManagement from "@/pages/admin/BatchManagement";
import ProctoringManagement from "@/pages/admin/ProctoringManagement";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";
import CandidateDashboard from "@/pages/candidate/CandidateDashboard";
import MyExams from "@/pages/candidate/MyExams";
import Results from "@/pages/candidate/Results";
import Profile from "@/pages/candidate/Profile";
import ExamInterface from "@/pages/exam/ExamInterface";
import ExamSubmissionSuccess from "@/pages/exam/ExamSubmissionSuccess";
import IDVerificationPage from "@/pages/candidate/IDVerificationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AppLayout><AdminDashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/questions" element={<ProtectedRoute requiredRole="admin"><AppLayout><QuestionBank /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/exams" element={<ProtectedRoute requiredRole="admin"><AppLayout><ExamManagement /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/create-exam" element={<ProtectedRoute requiredRole="admin"><AppLayout><CreateExam /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/candidates" element={<ProtectedRoute requiredRole="admin"><AppLayout><CandidateManagement /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/batches" element={<ProtectedRoute requiredRole="admin"><AppLayout><BatchManagement /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/calendar" element={<ProtectedRoute requiredRole="admin"><AppLayout><Calendar /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/proctoring" element={<ProtectedRoute requiredRole="admin"><AppLayout><ProctoringManagement /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><AppLayout><Reports /></AppLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
          
          {/* Candidate Routes */}
          <Route path="/candidate" element={<ProtectedRoute requiredRole="candidate"><AppLayout><CandidateDashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/candidate/exams" element={<ProtectedRoute requiredRole="candidate"><AppLayout><MyExams /></AppLayout></ProtectedRoute>} />
          <Route path="/candidate/results" element={<ProtectedRoute requiredRole="candidate"><AppLayout><Results /></AppLayout></ProtectedRoute>} />
          <Route path="/candidate/profile" element={<ProtectedRoute requiredRole="candidate"><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
          
          {/* ID Verification */}
          <Route path="/verify/:examId" element={<IDVerificationPage />} />
          
          {/* Exam Taking */}
          <Route path="/exam/:examId" element={<ExamInterface />} />
          <Route path="/exam/:examId/success" element={<ExamSubmissionSuccess />} />
          
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
