import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-white text-2xl font-black italic">CLUTCH</Link>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-indigo-400">Accueil</Link>
          <Link to="/matches" className="text-gray-300 hover:text-indigo-400">Matchs</Link>
          <Link to="/profile" className="text-gray-300 hover:text-indigo-400">Mon Profil</Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600">Connexion</Link>
              <Link to="/register" className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">Inscription</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
