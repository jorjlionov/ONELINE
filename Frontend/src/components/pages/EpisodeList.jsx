import React from "react";

const episodes = [
  { id: 1, title: "Эпизод 1" },
  { id: 2, title: "Эпизод 2" },
  { id: 3, title: "Эпизод 3" },
  { id: 4, title: "Эпизод 4" },
  { id: 5, title: "Эпизод 5" },
  { id: 6, title: "Эпизод 6" },
  { id: 7, title: "Эпизод 7" },
  { id: 8, title: "Эпизод 8" }
];

function EpisodeList() {
    const handleWatch = (id) =>{
    console.log(`Запуск серии ${id}`);

    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-6">
                Список серий
            </h2>

            <div className="grid grid-cols-6 gap-4">
                {episodes.map((episode) => (
                    <button
                    key={episode.id}
                    onClick={() => handleWatch(episode.id)}
                    className="bg-gray-950 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl outline-2 outline-transparent hover:outline-blue-400 outline-offset-0 hover:-outline-offset-2 transition-all duration-200 hover:scale-110 flex items-center justify-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {episode.title}
                    </button>
                ))}
            </div>
        </main>
    )

}

export default EpisodeList