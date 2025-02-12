import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Impossible de réinitialiser le mot de passe.");
      }

      setMessage("Mot de passe mis à jour !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Nouveau mot de passe</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 w-full">
          Mettre à jour le mot de passe
        </button>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
