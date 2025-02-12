import React, { useEffect, useState } from "react";
import { getUpcomingValorantMatches, getRunningValorantMatches } from "../services/pandascoreService";
import UpcomingMatchList from "../components/UpcomingMatchList";
import LiveMatchList from "../components/LiveMatchList";

const Matches = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const upcoming = await getUpcomingValorantMatches();
        const live = await getRunningValorantMatches();

        console.log("✅ Matchs à venir :", upcoming);
        console.log("✅ Matchs en direct :", live);

        if (!upcoming.length && !live.length) {
          setError("Aucun match trouvé.");
        }

        setUpcomingMatches(upcoming);
        setLiveMatches(live);
      } catch (err) {
        setError("Erreur de récupération des matchs.");
        console.error("Erreur API :", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      {loading && <p className="text-center text-gray-400 text-lg">Chargement des matchs...</p>}
      {error && <p className="text-center text-red-400 text-lg">{error}</p>}
      {!loading && !error && (
        <>
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <h2 className="text-white text-xl font-semibold">LIVE</h2>
          </div>
          <LiveMatchList matches={liveMatches} />

          <div className="flex items-center mb-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
            <h2 className="text-white text-xl font-semibold">UPCOMING</h2>
          </div>
          <UpcomingMatchList matches={upcomingMatches} />
        </>
      )}
    </div>
  );
};

export default Matches;
