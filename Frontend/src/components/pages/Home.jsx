import React, {useState} from "react";
import Header from "../Header.jsx";
import Cards from "../Cards.jsx";
import { MovieAPI } from "../../api/axios.js";

function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);

    try {
      const {data} = await MovieAPI.search(query);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

return (
    <div>
      <Header onSearch={handleSearch} />
      
      {/* ← добавлен индикатор загрузки */}
      {loading && (
        <div className="text-white text-center p-4">Поиск...</div>
      )}

      {searchResults ? (
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6 mt-8">
            <h2 className="text-xl text-white">
              Результаты: <span className="text-blue-400">"{searchQuery}"</span>
              <span className="text-gray-400 ml-2">({searchResults.length})</span>
            </h2>
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-white flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Очистить
            </button>
          </div>
          
          {searchResults.length > 0 ? (
            <Cards movies={searchResults} />
          ) : (
            <div className="text-gray-400 text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">Ничего не найдено</p>
            </div>
          )}
        </main>
      ) : (
        <Cards />
      )}
    </div>
  );
}

export default Home;