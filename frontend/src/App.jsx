import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ReqResetPass from "./pages/ReqResetPass.jsx";
import ResendVerification from "./pages/ResendVerification.jsx";

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/request-password-reset" element={<ReqResetPass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> }/>
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
