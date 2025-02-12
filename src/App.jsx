import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Matches from "./pages/Matches";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MatchDetails from './pages/MatchDetails';
import LiveMatchDetails from './pages/LiveMatchDetails';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Vérifier si un token est stocké
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
        <Route path="/livematch/:matchId" element={<LiveMatchDetails />} />
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        
        {/* ✅ Protection de la route profil */}
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
