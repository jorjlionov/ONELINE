import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/pages/Home';
import EpisodeList from "./components/pages/EpisodeList";
import Player from "./components/pages/Player" ;

function App() {
  return(
    <BrowserRouter>
    <div className="bg-indigo-950 min-h-screen">
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/series/:id" element={<EpisodeList />} />
          <Route path="/watch/:id" element={<Player />} />
          <Route path="/watch/:id/:episodeId" element={<Player />} />
        </Route>
      </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;
