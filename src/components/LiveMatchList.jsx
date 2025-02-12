import React from "react";
import LiveMatchCard from "./LiveMatchCard";

const LiveMatchList = ({ matches }) => {
  if (!matches || matches.length === 0) {
    console.warn("⚠️ Aucun match en direct trouvé :", matches);
    return <p className="text-gray-500 text-lg text-center">Aucun match en direct.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {matches.map((match, index) => (
        <LiveMatchCard key={match.id || index} match={match} />
      ))}
    </div>
  );
};

export default LiveMatchList;
