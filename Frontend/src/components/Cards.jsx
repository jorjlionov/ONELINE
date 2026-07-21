import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { MovieAPI, getMediaUrl } from "../api/axios.js";

function Cards({movies: propMovies, onDelete}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(!propMovies);

  useEffect(() => {
    if (propMovies) {
      setMovies(propMovies);
      setLoading(false);
    } else {
      loadMovies();
    }
  }, [propMovies]);

  const loadMovies = async () => {
    try {
      const { data } = await MovieAPI.getAll();
      setMovies(data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Удалить?')) return;

    try {
      await MovieAPI.delete(id);
      onDelete?.(id);
      loadMovies();
    } catch (err) {
      alert('Ошибка удаления' + err.message);
    }
  };

  if (loading) return <div className="text-white text-center text-2xl">Загрузка...⏳</div>;
  
  if (movies.length === 0) {
    return(
      <main className="container mx-auto px-4 py-8 mt-8">
        <div>КАТОЛОГ ПУСТ😂🫵
          <img src={getMediaUrl("/api/media/posters/placeholder_catalog.webp")} alt=""/>
        </div>
      </main>
    );
  }
 return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <Link
              to={movie.type === "movie" ? `/watch/${movie.id}` : `/series/${movie.id}`}
              className="block bg-gray-800 rounded-lg overflow-hidden aspect-2/3 hover:scale-105 transition-transform outline-2 outline-transparent hover:outline-blue-400 outline-offset-0 hover:outline-offset-4"
            >
              <div className="absolute top-2 right-2 z-10 bg-black/60 rounded-full p-2">
                {movie.type === "movie" ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>

              <img
                src={getMediaUrl(movie.poster)}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getMediaUrl("/api/media/posters/PlaceHolder.webp");
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm">
                <h3 className="text-white p-4 font-bold text-center">{movie.title}</h3>
              </div>
            </Link>
            
            {onDelete && (
              <button
                onClick={(e) => handleDelete(movie.id, e)}
                className="absolute top-2 left-2 bg-red-600 hover:bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Cards;