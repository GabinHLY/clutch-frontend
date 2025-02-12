import React from "react";
import UpcomingMatchCard from "./UpcomingMatchCard";

const UpcomingMatchList = ({ matches }) => {
  if (!matches || matches.length === 0) {
    console.warn("⚠️ Aucun match à venir trouvé :", matches);
    return <p className="text-gray-500 text-lg text-center">Aucun match à venir.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {matches.map((match, index) => (
        <UpcomingMatchCard key={match.id || index} match={match} />
      ))}
    </div>
  );
};

export default UpcomingMatchList;
