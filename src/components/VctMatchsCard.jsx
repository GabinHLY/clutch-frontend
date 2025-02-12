import React from "react";
import { useNavigate } from "react-router-dom";

const VctMatchsCard = ({ match }) => {
  const navigate = useNavigate();

  if (!match || !match.team_a || !match.team_b) {
    console.warn("⚠️ Problème avec les données du match :", match);
    return <p className="text-white text-center">Erreur : Données du match incomplètes</p>;
  }

  return (
    <div
      onClick={() => navigate(`/match/${match.id}`, { state: { match } })}
      className="w-[500px] bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 rounded-xl shadow-lg border border-gray-700 p-6 cursor-pointer transition-transform duration-300"
    >
      {/* Ligne supérieure : Nom du tournoi */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {match.serie?.name ? `VCT ${match.serie.name}` : "VCT Unknown"}
        </p>
      </div>

      {/* Bloc principal : Affichage des équipes */}
      <div className="flex items-center justify-between">
        {/* Équipe A */}
        <div className="flex items-center gap-4">
          <img
            src={match.team_a.logo || "https://via.placeholder.com/50"}
            alt={match.team_a.name}
            className="w-14 h-14 object-contain"
          />
          <span className="text-white font-bold text-xl">{match.team_a.name}</span>
        </div>

        {/* VS Separator */}
        <span className="text-white font-extrabold text-2xl">VS</span>

        {/* Équipe B */}
        <div className="flex items-center gap-4">
          <span className="text-white font-bold text-xl">{match.team_b.name}</span>
          <img
            src={match.team_b.logo || "https://via.placeholder.com/50"}
            alt={match.team_b.name}
            className="w-14 h-14 object-contain"
          />
        </div>
      </div>

      {/* Date et Heure du match */}
      <div className="text-center text-gray-400 text-sm mt-4">
        <span>{new Date(match.start_time).toLocaleDateString()}</span>
        <br />
        <span className="font-bold text-white text-lg">
          {new Date(match.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};

export default VctMatchsCard;
