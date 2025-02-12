import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: "" });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setUpdatedProfile({ name: data.name });
      } else navigate("/");
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const formData = new FormData();
    formData.append("name", updatedProfile.name);
    if (file) formData.append("profile_picture", file);
    
    const res = await fetch("http://localhost:3000/api/auth/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Profil mis à jour !");
      setUser((prev) => ({ ...prev, profile_picture: data.profile_picture, name: updatedProfile.name }));
      setIsEditing(false);
    } else {
      alert(data.error || "Erreur lors de la mise à jour");
    }
  };

  return user ? (
    <div className="min-h-screen bg-gray-900 py-10 flex flex-col items-center text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Mon Profil</h1>
        <div className="text-center space-y-6">
          <img
            src={user.profile_picture ? `http://localhost:3000/${user.profile_picture}` : "default-profile.png"}
            alt="Profil"
            className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-400"
          />
          {!isEditing ? (
            <>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="bg-indigo-600 px-4 py-2 rounded-lg text-lg font-semibold">Points : {user.points}</p>
              <button onClick={() => setIsEditing(true)} className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600">Modifier</button>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 w-full mt-4">Déconnexion</button>
            </>
          ) : (
            <>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block mx-auto text-center" />
              <input
                type="text"
                name="name"
                value={updatedProfile.name}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:ring-2 focus:ring-indigo-400"
              />
              <button onClick={handleUpdateProfile} className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600">Enregistrer</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600">Annuler</button>
            </>
          )}
        </div>
      </div>
    </div>
  ) : <p>Chargement...</p>;
};

export default Profile;
