import React from "react";
import { useParams, Link } from "react-router-dom";
import { movies } from "../../data/movies";

function EpisodeList() {
  const { id } = useParams();
  const series = movies.find(m => m.id === Number(id));

  if (!series || series.type !== "series") {
    return <div className="text-white p-8">Сериал не найден</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Кнопка назад */}
      <Link to="/" className="inline-flex items-center text-white mb-6 hover:text-blue-400">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад
      </Link>

      <h2 className="text-2xl font-bold text-white mb-2">{series.title}</h2>
      <p className="text-gray-400 mb-6">Выберите серию</p>

      {/* Сетка серий */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {series.episodes.map((episode) => (
          <Link
            key={episode.id}
            to={`/watch/${id}/${episode.id}`}
            className="bg-gray-950 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl outline-2 outline-transparent hover:outline-blue-400 outline-offset-0 hover:outline-offset-2 transition-all duration-200 hover:scale-110 flex items-center justify-center gap-2"
          >
            {/* Иконка Play */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {episode.title}
          </Link>
        ))}
      </div>
    </main>
  );
}

export default EpisodeList;