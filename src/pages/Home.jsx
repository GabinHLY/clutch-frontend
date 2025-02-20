import { useEffect, useState } from "react";
import { getRunningValorantMatches } from "../services/pandascoreService"; // Import de l'API
import VctMatchList from "../components/VctMatchList";
import LiveMatchList from "../components/LiveMatchList";

const Home = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        const live = await getRunningValorantMatches();
        console.log("✅ Matchs en direct :", live);

        if (!live.length) {
          setError("Aucun match en direct.");
        }

        setLiveMatches(live);
      } catch (err) {
        setError("Erreur de récupération des matchs en direct.");
        console.error("Erreur API :", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-2">
          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
          <h2 className="text-white text-xl font-semibold">BIG MATCHES</h2>
        </div>
        <VctMatchList />

        {/* Coming Soon Section */}
        <div className="mt-10 text-center">
          <h2 className="text-white text-2xl font-semibold">COMING SOON</h2>
          <div className="flex justify-center items-center gap-60 mt-4">
            <div className="flex justify-center w-32">
              <img src="../assets/img/lol.png" alt="League of Legends" className="h-16" />
            </div>
            <div className="flex justify-center w-32">
              <img src="../assets/img/rl.png" alt="Rocket League" className="h-16" />
            </div>
            <div className="flex justify-center w-32">
              <img src="../assets/img/csgo.png" alt="CSGO" className="h-16" />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <h2 className="text-white text-xl font-semibold">LIVE</h2>
          </div>

          {loading && <p className="text-center text-gray-400 text-lg">Chargement des matchs...</p>}
          {error && <p className="text-center text-red-400 text-lg">{error}</p>}
          {!loading && !error && <LiveMatchList matches={liveMatches} />}
        </div>
      </main>
    </div>
  );
};

export default Home;
