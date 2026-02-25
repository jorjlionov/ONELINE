import React from "react";
import HomePage from "./components/pages/Home";
import EpisodeList from "./components/pages/EpisodeList";

function App() {
  return <>
  <div className="bg-indigo-950 min-h-screen">
    {/* <HomePage/> */}
    <EpisodeList/>
  </div>
  </>;

}

export default App;
