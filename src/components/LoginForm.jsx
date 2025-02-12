import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Échec de la connexion.");
      }

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/profile");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Connexion</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 w-full">
          Se connecter
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* ✅ Lien vers la page de récupération du mot de passe */}
        <p className="mt-4 text-gray-400 text-sm">
          <Link to="/forgot-password" className="text-indigo-400 hover:underline">Mot de passe oublié ?</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
