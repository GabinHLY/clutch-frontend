const API_BASE_URL = "http://localhost:3000/api/pandascore";
const ODDS_API_BASE_URL = "http://localhost:3000/api/odds";  // ✅ Nouvelle API pour récupérer les cotes

// ✅ Récupérer les matchs à venir de Valorant
export async function getUpcomingValorantMatches() {
  const response = await fetch(`${API_BASE_URL}/valorant/upcoming`);
  return response.json();
}

// ✅ Récupérer les matchs en direct de Valorant
export async function getRunningValorantMatches() {
  const response = await fetch(`${API_BASE_URL}/valorant/live`);
  return response.json();
}

// ✅ Récupérer les matchs passés de Valorant
export async function getPastValorantMatches() {
  const response = await fetch(`${API_BASE_URL}/valorant/past`);
  return response.json();
}

// ✅ Récupérer les équipes d’un jeu (ex: Valorant)
export async function getTeams(game) {
  const response = await fetch(`${API_BASE_URL}/${game}/teams`);
  return response.json();
}

// ✅ Récupérer une équipe par son nom
export async function getTeamByName(name) {
  const response = await fetch(`${API_BASE_URL}/team/${name}`);
  return response.json();
}

// ✅ Récupérer les stats d’une équipe par ID
export async function getTeamStatsById(teamId) {
  const response = await fetch(`${API_BASE_URL}/team/stats/${teamId}`);
  return response.json();
}

// ✅ Récupérer les cotes des matchs sélectionnés (nouvelle fonction)
export async function getMatchOdds(matches) {
  const response = await fetch(`${ODDS_API_BASE_URL}/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matches }),
  });
  return response.json();
}
