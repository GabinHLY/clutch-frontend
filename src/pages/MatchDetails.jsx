import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MatchDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(state?.match || null);
  const [loading, setLoading] = useState(!state?.match);
  const [error, setError] = useState(null);
  const [rosters, setRosters] = useState({ team_a: [], team_b: [] });

  /** 🚀 Récupération des détails du match */
  useEffect(() => {
    if (!match) {
      const fetchMatchDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/match/${id}`);
          if (!response.ok) throw new Error("Impossible de récupérer le match.");
          const data = await response.json();
          setMatch(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMatchDetails();
    }
  }, [id, match]);

  /** 🚀 Récupération des rosters des équipes */
  useEffect(() => {
    if (match) {
      console.log("📡 Récupération des rosters pour :", match.team_a.name, "et", match.team_b.name);

      const fetchRosters = async (teamName, teamKey) => {
        try {
          const formattedName = teamName.replace(/\s+/g, "_");
          const url = `http://localhost:3000/api/team/${formattedName}`;
          
          console.log(`🔗 API Call → ${url}`);

          const response = await fetch(url);

          // 🔍 Vérifier si on reçoit du JSON et non du HTML
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.log(contentType)
            console.log(response);
            console.error(`❌ Mauvais format reçu pour ${teamName}, reçu :`, contentType);
            return;
          }

          const data = await response.json();
          console.log(`✅ Roster récupéré pour ${teamName}:`, data);

          setRosters(prev => ({ ...prev, [teamKey]: data.roster || [] }));
        } catch (err) {
          console.error(`❌ Erreur lors de la récupération du roster pour ${teamName}:`, err);
        }
      };

      fetchRosters(match.team_a.name, "team_a");
      fetchRosters(match.team_b.name, "team_b");
    }
  }, [match]);

  if (loading) return <div className="text-center text-white">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center">Erreur : {error}</div>;
  if (!match) return <div className="text-red-500 text-center">Match non trouvé</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      
      {/* 🔙 Bouton Retour */}
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-gray-400 hover:text-white">
        ← Retour aux matchs
      </button>

      {/* 🏆 Nom de la compétition centré */}
      {match.serie && (
        <div className="text-center mb-8">
          {match.serie.logo && (
            <img src={match.serie.logo} alt={match.serie.name} className="w-12 mx-auto mb-2" />
          )}
          <p className="text-xl font-bold uppercase tracking-wide">{match.serie.name}</p>
        </div>
      )}

      {/* 🆚 Affichage des équipes avec grands logos */}
      <div className="flex items-center justify-center w-full max-w-4xl space-x-12">
        {/* Équipe A */}
        <div className="flex flex-col items-center">
          <img 
            src={match.team_a.logo || "https://via.placeholder.com/100"}
            alt={match.team_a.name} 
            className="w-28 h-28 object-contain"
          />
          <span className="text-lg font-semibold mt-2">{match.team_a.name}</span>

          {/* 🎮 Roster Équipe A */}
          {rosters.team_a.length > 0 ? (
            <div className="mt-4 bg-gray-800 p-4 rounded-lg w-full">
              <h3 className="text-center text-gray-400 font-semibold">Roster</h3>
              <ul className="mt-2 text-center">
                {rosters.team_a.map((player, index) => (
                  <li key={index} className="text-white">{player}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">Roster non disponible</p>
          )}
        </div>

        {/* VS */}
        <span className="text-3xl font-bold text-gray-400">VS</span>

        {/* Équipe B */}
        <div className="flex flex-col items-center">
          <img 
            src={match.team_b.logo || "https://via.placeholder.com/100"} 
            alt={match.team_b.name} 
            className="w-28 h-28 object-contain"
          />
          <span className="text-lg font-semibold mt-2">{match.team_b.name}</span>

          {/* 🎮 Roster Équipe B */}
          {rosters.team_b.length > 0 ? (
            <div className="mt-4 bg-gray-800 p-4 rounded-lg w-full">
              <h3 className="text-center text-gray-400 font-semibold">Roster</h3>
              <ul className="mt-2 text-center">
                {rosters.team_b.map((player, index) => (
                  <li key={index} className="text-white">{player}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">Roster non disponible</p>
          )}
        </div>
      </div>

      {/* 📅 Date et heure du match */}
      <div className="mt-8 text-center text-gray-300">
        <p className="text-lg flex items-center gap-2">
          📅 {new Date(match.start_time).toLocaleDateString()} - 🕒 {new Date(match.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="mt-4 text-gray-400">Le match n'a pas encore commencé.</p>
      </div>
    </div>
  );
};

export default MatchDetails;
