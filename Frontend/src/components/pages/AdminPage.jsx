import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MovieAPI } from "../../api/axios.js";
import Cards from "../Cards.jsx";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [message, setMessage] = useState("");

  const [movieForm, setMovieForm] = useState({
    title: "",
    poster: "/api/media/posters/placeholder.webp",
    file: "",
  });

  const [seriesForm, setSeriesForm] = useState({
    title: "",
    poster: "/api/media/posters/placeholder.webp",
    folder: "",
    episodes: [{ id: 1, title: "1 серия", file: "episode-01.mp4" }],
  });

  const addEpisode = () => {
    const num = seriesForm.episodes.length + 1;
    setSeriesForm({
      ...seriesForm,
      episodes: [
        ...seriesForm.episodes,
        {
          id: num,
          title: `${num} серия`,
          file: `episode-${String(num).padStart(2, "0")}.mp4`,
        },
      ],
    });
  };

  const updateEpisode = (index, field, value) => {
    const newEpisodes = [...seriesForm.episodes];
    newEpisodes[index][field] = value;
    setSeriesForm({ ...seriesForm, episodes: newEpisodes });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await MovieAPI.addMovie(movieForm);
      setMessage("✅ Фильм добавлен!");
      setMovieForm({
        title: "",
        poster: "/api/media/posters/placeholder.webp",
        file: "",
      });
    } catch (err) {
      setMessage("❌ Ошибка: " + err.message);
    }
  };

  const handleAddSeries = async (e) => {
    e.preventDefault();
    try {
      await MovieAPI.addSeries(seriesForm);
      setMessage("✅ Сериал добавлен!");
      setSeriesForm({
        title: "",
        poster: "/api/media/posters/placeholder.webp",
        folder: "",
        episodes: [{ id: 1, title: "1 серия", file: "episode-01.mp4" }],
      });
    } catch (err) {
      setMessage("❌ Ошибка: " + err.message);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link to="/" className="text-white hover:text-blue-400 mb-4 inline-block">
        ← Назад
      </Link>

      <h1 className="text-2xl font-bold text-white mb-6">Админ панель</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-lg ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
        >
          Список
        </button>
        <button
          onClick={() => setActiveTab("movie")}
          className={`px-4 py-2 rounded-lg ${activeTab === "movie" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
        >
          + Фильм
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={`px-4 py-2 rounded-lg ${activeTab === "series" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
        >
          + Сериал
        </button>
      </div>

      {message && (
        <div className="bg-green-900/50 text-green-400 p-4 rounded-lg mb-6">
          {message}
        </div>
      )}

      {activeTab === "list" && <Cards onDelete={() => {}} />}

      {activeTab === "movie" && (
        <form
          onSubmit={handleAddMovie}
          className="bg-gray-800 p-6 rounded-lg max-w-md"
        >
          <h2 className="text-xl font-bold text-white mb-4">Новый фильм</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Название</label>
              <input
                type="text"
                value={movieForm.title}
                onChange={(e) =>
                  setMovieForm({ ...movieForm, title: e.target.value })
                }
                className="w-full bg-gray-900 text-white px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">
                Имя файла видео
              </label>
              <input
                type="text"
                value={movieForm.file}
                onChange={(e) =>
                  setMovieForm({ ...movieForm, file: e.target.value })
                }
                placeholder="movie.mp4"
                className="w-full bg-gray-900 text-white px-3 py-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg"
            >
              Добавить фильм
            </button>
          </div>
        </form>
      )}

      {activeTab === "series" && (
        <form
          onSubmit={handleAddSeries}
          className="bg-gray-800 p-6 rounded-lg max-w-lg"
        >
          <h2 className="text-xl font-bold text-white mb-4">Новый сериал</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Название</label>
              <input
                type="text"
                value={seriesForm.title}
                onChange={(e) =>
                  setSeriesForm({ ...seriesForm, title: e.target.value })
                }
                className="w-full bg-gray-900 text-white px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">
                Папка с сериями
              </label>
              <input
                type="text"
                value={seriesForm.folder}
                onChange={(e) =>
                  setSeriesForm({ ...seriesForm, folder: e.target.value })
                }
                placeholder="anime-name"
                className="w-full bg-gray-900 text-white px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-400">Серии</label>
                <button
                  type="button"
                  onClick={addEpisode}
                  className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  + Добавить серию
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {seriesForm.episodes.map((ep, idx) => (
                  <div key={idx} className="flex gap-2 bg-gray-900 p-2 rounded">
                    <input
                      type="text"
                      value={ep.title}
                      onChange={(e) =>
                        updateEpisode(idx, "title", e.target.value)
                      }
                      className="flex-1 bg-gray-800 text-white px-2 py-1 rounded text-sm"
                    />
                    <input
                      type="text"
                      value={ep.file}
                      onChange={(e) =>
                        updateEpisode(idx, "file", e.target.value)
                      }
                      className="flex-1 bg-gray-800 text-white px-2 py-1 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg"
            >
              Добавить сериал
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default AdminPage;
