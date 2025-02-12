import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [teamAData, setTeamAData] = useState(null);
  const [teamBData, setTeamBData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [aRes, bRes] = await Promise.all([
          fetch(`/api/team/${state.match.team_a.slug}`),
          fetch(`/api/team/${state.match.team_b.slug}`),
        ]);
        const aData = await aRes.json();
        const bData = await bRes.json();
        setTeamAData(aData);
        setTeamBData(bData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    if (state?.match) fetchTeamData();
  }, [state]);

  const renderStream = (streamUrl) => {
    if (!streamUrl) {
      return <p className="text-red-500">Aucun stream disponible</p>;
    }
  
    if (streamUrl.includes("twitch.tv")) {
      const channelName = streamUrl.split("/").pop();
      return (
        <iframe
          src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost&autoplay=true&muted=false`}
          title="Twitch Stream"
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      );
    } else if (streamUrl.includes("youtube.com") || streamUrl.includes("youtu.be")) {
      let videoId = "";
      if (streamUrl.includes("youtu.be")) {
        videoId = streamUrl.split("/").pop();
      } else {
        const urlParams = new URLSearchParams(new URL(streamUrl).search);
        videoId = urlParams.get("v");
      }
  
      if (!videoId) return <p className="text-red-500">Impossible de récupérer l'ID de la vidéo YouTube</p>;
  
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Stream"
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      );
    } else {
      return <p className="text-red-500">Stream non supporté</p>;
    }
  };
  

  if (!state?.match) return <div className="text-center text-red-500">Match non trouvé</div>;

  const match = state.match; // Assigne `state.match` à une variable pour éviter les répétitions

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

      {/* 🆚 Affichage des équipes avec grands logos et score */}
      <div className="flex items-center justify-center w-full max-w-4xl space-x-12">
        {/* Équipe A */}
        <div className="flex flex-col items-center">
          <img 
            src={match.team_a.logo || "https://via.placeholder.com/100"} 
            alt={match.team_a.name} 
            className="w-28 h-28 object-contain"
          />
          <span className="text-lg font-semibold mt-2">{match.team_a.name}</span>
        </div>

        {/* Score et VS */}
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-400">VS</span>
          <span className="text-5xl font-bold text-white mt-2">
            {match.team_a.score} - {match.team_b.score}
          </span>
        </div>

        {/* Équipe B */}
        <div className="flex flex-col items-center">
          <img 
            src={match.team_b.logo || "https://via.placeholder.com/100"} 
            alt={match.team_b.name} 
            className="w-28 h-28 object-contain"
          />
          <span className="text-lg font-semibold mt-2">{match.team_b.name}</span>
        </div>
      </div>


      {/* 📺 Stream en plein écran sans bandes noires */}
      {match.status === "running" && match.stream_url && (
        <div className="flex justify-center mt-8 w-full">
          <div className="w-full max-w-6xl aspect-video">
            {renderStream(match.stream_url)}
          </div>
        </div>
      )}

    </div>
  );
};

export default MatchDetails;
