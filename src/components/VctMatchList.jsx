import React, { useEffect, useState, useRef } from "react";
import VctMatchsCard from "./VctMatchsCard";
import axios from "axios";

const VctMatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchVctMatches() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/pandascore/valorant/vct/upcoming");
        console.log("📡 Réponse de l'API :", data);

        // 🔥 Supprimer les doublons en utilisant un Map basé sur les IDs
        const uniqueMatches = Array.from(new Map(data.map(match => [match.id, match])).values());

        console.log("📝 Liste après suppression des doublons :", uniqueMatches);

        setMatches(uniqueMatches.slice(0, 5)); // 🔥 Limite à 5 matchs uniques
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des matchs VCT :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVctMatches();
  }, []);

    useEffect(() => {
      if (sliderRef.current) {
        let scrollSpeed = 1; // Ajuste la vitesse du scroll
        let scrollAmount = 0;
        const slider = sliderRef.current;

        function autoScroll() {
          if (slider.scrollLeft >= slider.scrollWidth / 2) {
            slider.scrollLeft = 0; // Reset pour éviter le rollback
          }
          slider.scrollLeft += scrollSpeed;
          scrollAmount = requestAnimationFrame(autoScroll);
        }

        autoScroll(); // Démarre l'animation

        return () => cancelAnimationFrame(scrollAmount); // Nettoyage
      }
    }, [matches]);

  if (loading) {
    return <p className="text-gray-500 text-lg text-center">Chargement des matchs VCT...</p>;
  }

  if (!matches || matches.length === 0) {
    console.warn("⚠️ Aucun match VCT à venir trouvé :", matches);
    return <p className="text-gray-500 text-lg text-center">Aucun match VCT à venir.</p>;
  }

  return (
    
    <div className="relative w-full overflow-hidden py-5">
      <div ref={sliderRef} className="flex space-x-6 whitespace-nowrap overflow-hidden">
        {[...matches, ...matches].map((match, index) => (
          <div key={index} className="flex-shrink-0">
            <VctMatchsCard match={match} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VctMatchList;
