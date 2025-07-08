
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminUsers } from "@/pages/admin/AdminUsers";
import { AdminCars } from "@/pages/admin/AdminCars";
import { AdminAppointments } from "@/pages/admin/AdminAppointments";
import { AdminNotifications } from "@/pages/admin/AdminNotifications";
import { AdminSettings } from "@/pages/admin/AdminSettings";
import { UserDashboard } from "@/pages/user/UserDashboard";
import { UserCars } from "@/pages/user/UserCars";
import { UserAppointments } from "@/pages/user/UserAppointments";
import { UserSubscription } from "@/pages/user/UserSubscription";
import { UserProfile } from "@/pages/user/UserProfile";
import { UserFeedback } from "@/pages/user/UserFeedback";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requireAdmin?: boolean 
}> = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/user/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={isAdmin ? "/admin/dashboard" : "/user/dashboard"} replace />
          ) : (
            <Index />
          )
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminUsers />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/cars" 
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminCars />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/appointments" 
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminAppointments />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/notifications" 
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminNotifications />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminSettings />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* User Routes */}
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/cars" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserCars />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/appointments" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserAppointments />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/subscription" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserSubscription />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/profile" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserProfile />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/feedback" 
        element={
          <ProtectedRoute>
            <Layout>
              <UserFeedback />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
