import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ReqResetPass from "./pages/ReqResetPass.jsx";

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/request-password-reset" element={<ReqResetPass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
