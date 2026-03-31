// TODO ПЕРЕПИСАТЬ И ПОНЯТЬ

import React, { useState, useEffect, useRef } from "react";
import { MovieAPI } from "../api/axios.js";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
  setLoading(true);
  try {
    const { data } = await MovieAPI.search(query);
    
    // ← УДАЛЯЕМ ДУБЛИКАТЫ по id
    const unique = data.filter((item, index, self) => 
      index === self.findIndex((t) => t.id === item.id)
    );
    
    setSuggestions(unique.slice(0, 5)); // берём первые 5 уникальных
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowDropdown(false);
    onSearch?.(query);
  };

  const handleSuggestionClick = (movie) => {
    setQuery(movie.title);
    setShowDropdown(false);
    onSearch?.(movie.title);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => query.trim() && setShowDropdown(true)}
          placeholder="Поиск аниме..."
          className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-l-full outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
        />
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-r-full border border-l-0 border-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {showDropdown && (suggestions.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
          {loading ? (
            <div className="p-4 text-gray-400 text-center">Поиск...</div>
          ) : (
            <>
              {suggestions.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleSuggestionClick(movie)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 text-left transition-colors"
                >
                  {movie.type === "movie" ? (
                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  <span className="text-white truncate">{movie.title}</span>
                  <span className="text-gray-500 text-sm ml-auto capitalize">{movie.type}</span>
                </button>
              ))}
              
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 text-blue-400 hover:bg-gray-800 text-sm border-t border-gray-700"
              >
                Все результаты для "{query}"
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;