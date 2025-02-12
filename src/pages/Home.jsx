import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VctMatchList from "../components/VctMatchList";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-2">
          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
          <h2 className="text-white text-xl font-semibold">BIG MATCHES</h2>
      </div>
      <VctMatchList />

      </main>
    </div>
  );
};

export default Home;
