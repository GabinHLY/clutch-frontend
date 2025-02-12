import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) navigate("/login");
    else alert(data.error || "Échec de l'inscription");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-2xl font-bold text-indigo-400 mb-4">Inscription</h2>
      <form onSubmit={handleSubmit} className="w-80 bg-gray-800 p-6 shadow-lg rounded-lg">
        <input name="name" type="text" placeholder="Nom" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:ring-2 focus:ring-indigo-400 mb-2" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:ring-2 focus:ring-indigo-400 mb-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Mot de passe" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:ring-2 focus:ring-indigo-400 mb-2" onChange={handleChange} />
        <button className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterForm;
