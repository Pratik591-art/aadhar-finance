import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("./pages/landingPage"));
const GetStarted = lazy(() => import("./pages/getStarted"));
const Login = lazy(() => import("./pages/login"));
const PersonalLoan = lazy(() => import("./pages/loanPage/personalLoan"));
const BusinessLoanForm = lazy(() =>
  import("./pages/loanPage/BusinessLoanForm")
);
const LoanSelector = lazy(() => import("./pages/loanPage/index"));


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/get-started" />;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/loan" element={<LoanSelector/>} />
          <Route path="/loan/personal" element={<PersonalLoan />} />
          <Route path="/loan/business" element={<BusinessLoanForm />} />
          {/* Dashboard route will be added later */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Suspense>
      </Layout>
    </AuthProvider>
  );
}

export default App;
