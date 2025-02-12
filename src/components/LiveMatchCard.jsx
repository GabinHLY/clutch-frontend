import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveMatchCard = ({ match }) => {
  const [isStreamVisible, setStreamVisible] = useState(false);
  const navigate = useNavigate();

  if (!match || !match.team_a || !match.team_b) {
    console.warn("⚠️ Problème avec les données du match en direct :", match);
    return <div className="text-red-500">Erreur : Données du match incomplètes</div>;
  }

  const handleStreamClick = () => {
    setStreamVisible(true);
  };

  const renderStream = (streamUrl) => {
    if (!streamUrl) {
      return <p className="text-red-500">Aucun stream disponible</p>;
    }

    if (streamUrl.includes("twitch.tv")) {
      const channelName = streamUrl.split("/").pop();
      return (
        <iframe
          src={`https://player.twitch.tv/?channel=${channelName}&parent=localhost`}
          title="Twitch Stream"
          className="w-full h-64 border-none rounded-lg"
          allowFullScreen
        ></iframe>
      );
    } else if (streamUrl.includes("sooplive")) {
      return (
        <a
          href={streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          🌐 Voir le stream sur SoopLive
        </a>
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
          className="w-full h-64 border-none rounded-lg"
          allowFullScreen
        ></iframe>
      );
    } else {
      return <p className="text-red-500">Stream non supporté</p>;
    }
  };

  return (
    <div onClick={() => navigate(`/livematch/${match.id}`, { state: { match } })} className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg text-white text-center relative border border-gray-700 cursor-pointer hover:scale-105 transition-transform">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">{match.serie?.name || "Tournoi inconnu"}</h3>

      <div className="flex justify-between items-center my-4 px-8 gap-4">
        {/* Équipe A */}
        <div className="flex flex-col items-center gap-2">
          <img src={match.team_a.logo || "https://via.placeholder.com/50"} alt={match.team_a.name} className="w-20 h-20 object-contain" />
          <p className="font-semibold text-gray-300 text-sm mt-2">{match.team_a.name}</p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold text-white">{match.team_a.score} - {match.team_b.score}</p>
        </div>

        {/* Équipe B */}
        <div className="flex flex-col items-center gap-2">
          <img src={match.team_b.logo || "https://via.placeholder.com/50"} alt={match.team_b.name} className="w-20 h-20 object-contain" />
          <p className="font-semibold text-gray-300 text-sm mt-2">{match.team_b.name}</p>
        </div>
      </div>

      {/* Bouton pour afficher le stream */}
      {!isStreamVisible ? (
        <button
          onClick={handleStreamClick}
          className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition uppercase text-sm tracking-wide shadow-md"
        >
          🔴 Regarder le stream
        </button>
      ) : (
        <div className="mt-4 relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
          {renderStream(match.stream_url)}
        </div>
      )}
    </div>
  );
};

export default LiveMatchCard;
