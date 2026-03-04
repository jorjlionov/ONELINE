import React from "react";
import { Link } from "react-router-dom";
import { movies } from "../data/movies";

function Cards() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={movie.type === "movie" ? `/watch/${movie.id}` : `/series/${movie.id}`}
            className="bg-gray-800 rounded-lg overflow-hidden aspect-2/3 flex flex-col text-center outline-2 outline-transparent hover:outline-blue-400 outline-offset-0 hover:outline-offset-4 transition-all duration-200 hover:scale-105 relative"
          >
            {/* Иконка типа */}
            <div className="absolute top-2 right-2 z-10 bg-black/60 rounded-full p-2">
              {movie.type === "movie" ? (
                // Иконка Play
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              ) : (
                // Иконка TV
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/posters/PlaceHolder.webp";
              }}
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm">
              <h3 className="text-white p-4 font-bold">
                {movie.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Cards;