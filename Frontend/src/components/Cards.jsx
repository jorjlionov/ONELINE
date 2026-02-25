import React from "react";

const moviesPosters = [
  { id: 1, title: "Фильм 1", poster: "/posters/DemonSlayer.webp" },
  { id: 2, title: "Фильм 2", poster: "/posters/2.jpg" }
];

function Cards() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {moviesPosters.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden aspect-3/4 flex flex-col text-center outline-2 outline-transparent hover:outline-blue-400 outline-offset-0 hover:outline-offset-4 transition-all duration-200 hover:scale-105 relative"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/posters/PlaceHolder.webp";
              }}
            />
            {/* Полупрозрачный фон под текстом */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm">
              <h3 className="text-white p-4 font-bold">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Cards;