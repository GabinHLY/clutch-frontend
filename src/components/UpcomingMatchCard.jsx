import React from "react";
import { useNavigate } from "react-router-dom";

const UpcomingMatchCard = ({ match }) => {
  const navigate = useNavigate();
  
  if (!match || !match.team_a || !match.team_b) {
    console.warn("⚠️ Problème avec les données du match :", match);
    return (
      <div className="text-red-500 text-center">
        Erreur : Données du match incomplètes
      </div>
    );
  }

  return (
    <div onClick={() => navigate(`/match/${match.id}`, { state: { match } })} className="hover:scale-105 transition-transform">
      <div className="flex items-center bg-gray-800 rounded-lg shadow-md border border-gray-700 p-3 ">
        {/* Affichage de la série */}
        <div className="flex items-center gap-2 w-1/4">
          {match.serie?.logo && (
            <img
              src={match.serie.logo}
              alt={match.serie.name}
              className="w-8 h-8 object-contain"
            />
          )}
          <p className="text-xs font-medium text-gray-300 truncate">
            {match.serie?.name || "Inconnue"}
          </p>
        </div>

        {/* Affichage des équipes et du VS */}
        <div className="flex items-center w-1/2 justify-center">
          <div className="flex items-center gap-2 w-1/2 justify-end">
            <img
              src={match.team_a.logo || "https://via.placeholder.com/50"}
              alt={match.team_a.name}
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-semibold text-sm truncate text-right">
              {match.team_a.name}
            </span>
          </div>
          <span className="text-white font-bold text-sm w-1/6 text-center">
            VS
          </span>
          <div className="flex items-center gap-2 w-1/2 justify-start">
            <span className="text-white font-semibold text-sm truncate text-left">
              {match.team_b.name}
            </span>
            <img
              src={match.team_b.logo || "https://via.placeholder.com/50"}
              alt={match.team_b.name}
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {/* Affichage de la date et de l'heure */}
        <div className="text-right text-gray-400 text-xs w-1/4">
          <span>{new Date(match.start_time).toLocaleDateString()}</span>
          <br />
          <span className="font-semibold text-white">
            {new Date(match.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatchCard;
