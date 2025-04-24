import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { ProtectedRoute, AdminRoute } from "./components/protected-route";
import { Loading } from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";
import { Layout } from "./components/Layout";

const Login = lazy(() =>
  import("@/pages/login").then((m) => ({ default: m.default }))
);
const AdminDashboard = lazy(() =>
  import("@/pages/admin/dashboard").then((m) => ({ default: m.default }))
);
const UserDashboard = lazy(() =>
  import("@/pages/user/dashboard").then((m) => ({ default: m.default }))
);
const Register = lazy(() =>
  import("@/pages/register").then((m) => ({ default: m.default }))
);
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/" element={<UserDashboard />} />
            </Route>
          </Routes>
          <Toaster />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
