import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SetPassword from "./pages/SetPassword.jsx";
import VerifySuccess from "./pages/VerifySuccess.jsx";
import VerifyExpired from "./pages/verifyExpired.jsx";

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/set-password" element={<ProtectedRoute> <SetPassword /> </ProtectedRoute>} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-expired" element={<VerifyExpired />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App