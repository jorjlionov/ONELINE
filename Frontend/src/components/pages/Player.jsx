import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieAPI, getMediaUrl } from "../../api/axios.js";

function Player() {
  const { id, episodeId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    MovieAPI.getById(id).then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <div className="text-white p-8">Загрузка...</div>;

  let videoUrl, title, backLink;

  if (movie.type === "movie") {
    videoUrl = getMediaUrl(`/api/media/videos/movies/${movie.file}`);
    title = movie.title;
    backLink = "/";
  } else {
    const episode = movie.episodes?.find(e => e.id === Number(episodeId));
    if (!episode) return <div className="text-white p-8">Серия не найдена</div>;
    
    videoUrl = getMediaUrl(`/api/media/videos/series/${movie.folder}/${episode.file}`);
    title = `${movie.title} — ${episode.title}`;
    backLink = `/series/${id}`;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link to={backLink} className="inline-flex items-center text-white mb-6 hover:text-blue-400">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад
      </Link>

      <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>

      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <video 
          src={videoUrl}
          controls 
          className="w-full h-full"
          poster={getMediaUrl(movie.poster)}
        >
          Ваш браузер не поддерживает видео
        </video>
      </div>
    </main>
  );
}

export default Player;