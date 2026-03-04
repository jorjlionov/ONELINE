import React from "react";
import { useParams, Link } from "react-router-dom";
import { movies } from "../../data/movies";

function Player() {
  const { id, episodeId} = useParams();

  const movie = movies.find(m => m.id === Number(id));

  if (!movie) {
    return <div className="text-white p-8">Не найдено</div>
  }

  let title = movie.title;
  let backLink = "/"
  
  if (movie.type === "series" && episodeId) {
    const episode = movie.episodes.find(e => e.id === Number(episodeId));
    if (episode) {
      title = `${movie.title} - ${episode.title}`;
    }
    backLink = `/series/${id}`;
  }

  return(
    <main className="container mx-auto px-4 py-8">
      {/* Кнопка назад */}
      <Link to={backLink} className="inline-flex items-center text-white mb-6 hover:text-blue-400">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад
      </Link>

      <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>

      <div className="aspect-video bg-black rounded-b-lg overflow-hidden">
        <video src={movie.videoUrl || "/videos/placeholder.mp4"}
        controls
        className="w-full h-full">
          
          Смени браузер
        
        </video>

      </div>
    </main>
  )
}
export default Player;