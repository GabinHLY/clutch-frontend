import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { User } from "lucide-react";

const MatchDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(state?.match || null);
  const [loading, setLoading] = useState(!state?.match);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("cotes");
  const [rosters, setRosters] = useState({ team_a: [], team_b: [] });
  const [odds, setOdds] = useState(null);
  const [stats, setStats] = useState({ team_a: null, team_b: null });

  useEffect(() => {
    if (!match) {
      fetch(`http://localhost:3000/api/match/${id}`)
        .then(res => res.json())
        .then(data => setMatch(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, match]);

  useEffect(() => {
    if (match) {
      fetch(`http://localhost:3000/api/odds/${match.id}`)
        .then(res => res.json())
        .then(setOdds)
        .catch(console.error);
    }
  }, [match]);

  useEffect(() => {
    if (match) {
      fetch(`http://localhost:3000/api/team/${match.team_a.name}`)
        .then(res => res.json())
        .then(data => setRosters(prev => ({ ...prev, team_a: data.roster || [] })))
        .catch(console.error);

      fetch(`http://localhost:3000/api/team/${match.team_b.name}`)
        .then(res => res.json())
        .then(data => setRosters(prev => ({ ...prev, team_b: data.roster || [] })))
        .catch(console.error);
    }
  }, [match]);

  useEffect(() => {
    if (match) {
      fetch(`http://localhost:3000/api/stats/${match.team_a.name}`)
        .then(res => res.json())
        .then(data => setStats(prev => ({ ...prev, team_a: data || null })))
        .catch(console.error);

      fetch(`http://localhost:3000/api/stats/${match.team_b.name}`)
        .then(res => res.json())
        .then(data => setStats(prev => ({ ...prev, team_b: data || null })))
        .catch(console.error);
    }
  }, [match]);

  if (loading) return <div className="text-center text-white">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center">Erreur : {error}</div>;
  if (!match) return <div className="text-red-500 text-center">Match non trouvé</div>;

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-gray-400 hover:text-white">
        ← Retour aux matchs
      </button>

      <div className="text-center mb-8">
        <p className="text-2xl font-bold uppercase text-gray-300">{match.serie?.name}</p>
      </div>

      <div className="flex items-center justify-center w-full max-w-5xl space-x-12 mb-8">
        <div className="flex flex-col items-center">
          <img src={match.team_a.logo} className="w-36 h-36 object-contain" />
          <span className="text-xl font-semibold mt-2">{match.team_a.name}</span>
        </div>

        <span className="text-4xl font-bold text-gray-400">VS</span>

        <div className="flex flex-col items-center">
          <img src={match.team_b.logo} className="w-36 h-36 object-contain" />
          <span className="text-xl font-semibold mt-2">{match.team_b.name}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button onClick={() => setActiveTab("cotes")} className={`px-8 py-3 rounded-lg text-lg font-bold ${activeTab === "cotes" ? "bg-indigo-500" : "bg-gray-700"}`}>Cotes</button>
        <button onClick={() => setActiveTab("stats")} className={`px-8 py-3 rounded-lg text-lg font-bold ${activeTab === "stats" ? "bg-indigo-500" : "bg-gray-700"}`}>Stats</button>
        <button onClick={() => setActiveTab("roster")} className={`px-8 py-3 rounded-lg text-lg font-bold ${activeTab === "roster" ? "bg-indigo-500" : "bg-gray-700"}`}>Roster</button>
      </div>

      <div className="mt-8 w-full max-w-4xl text-center">
        {activeTab === "cotes" && (
          <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-2xl italic text-gray-300">RÉSULTAT</h3>
            {odds ? (
              <div className="flex justify-center gap-6 mt-4">
                <div className="w-40 py-4 bg-indigo-500 rounded-lg text-white text-lg font-semibold flex flex-col items-center">
                  <span className="text-sm font-medium">{match.team_a.name.toUpperCase()}</span>
                  <span className="text-2xl font-bold">{odds.team_a_odds}</span>
                </div>
                <div className="w-40 py-4 bg-indigo-500 rounded-lg text-white text-lg font-semibold flex flex-col items-center">
                  <span className="text-sm font-medium">{match.team_b.name.toUpperCase()}</span>
                  <span className="text-2xl font-bold">{odds.team_b_odds}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mt-4">Pari indisponible</p>
            )}
          </div>
        )}

{activeTab === "stats" && (
  <div className="mt-8 grid grid-cols-2 gap-12 text-white text-lg sm:text-xl">
    {Object.entries(stats).map(([key, stat]) => (
      stat && (
        <div key={key} className="p-6 shadow-lg bg-gray-800 rounded-lg">
          <h3 className="text-center text-2xl font-bold mb-4 uppercase tracking-wide">
            Stats de {key === "team_a" ? match.team_a.name : match.team_b.name}
          </h3>
          <p className="text-lg text-gray-400">Winrate : {stat.winRate}%</p>
          <p className="text-lg text-gray-400">Round Diff : {stat.roundDifference.toFixed(2)}</p>
          <h4 className="text-xl font-semibold mt-6">Derniers matchs :</h4>
          <div className="space-y-4 mt-4">
            {stat.matchesForDisplay.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center p-5 rounded-xl text-white text-lg font-semibold
                  ${m.isWin ? "bg-green-600" : "bg-red-600"}`}
              >
                <span className="text-lg font-bold">{m.date}</span>
                <span className="text-xl">{m.opponent}</span>
                <span className="text-2xl font-extrabold">{m.score}</span>
              </div>
            ))}
          </div>
        </div>
      )
    ))}
  </div>
)}
  
        
        {activeTab === "roster" && (
          <div className="mt-8 grid grid-cols-2 gap-12 text-white text-lg sm:text-xl">
            {Object.entries(rosters).map(([key, players]) => (
              <div key={key} className="p-4 shadow-lg">
                <h3 className="text-center text-2xl font-bold mb-4 uppercase tracking-wide">
                  Roster de {key === "team_a" ? match.team_a.name : match.team_b.name}
                </h3>
                <div className="space-y-4">
                  {players.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 px-6 py-3 w-full rounded-lg bg-gray-700/50 hover:bg-gray-600 transition"
                    >
                      <User className="w-6 h-6 text-gray-300 flex-shrink-0" />
                      <span className="italic font-medium tracking-wide truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-[250px]">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
