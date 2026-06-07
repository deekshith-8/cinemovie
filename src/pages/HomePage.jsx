import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import MovieCard from '../components/MovieCard'
import '../components/MovieCard.css'

const API_KEY = 'b2368eef2bb9277076f02638705dccc1'

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 18, name: "Drama" },
  { id: 16, name: "Animation" },
  { id: 53, name: "Thriller" }
]

function HomePage() {

  const [query, setQuery] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeGenre, setActiveGenre] = useState(null)

  // Build URL based on what user is doing
  const url = searchTerm
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
    : activeGenre
    ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${activeGenre}&sort_by=popularity.desc`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

  const { data, loading, error } = useFetch(url)
  const movies = data?.results || []

  function handleSearch() {
    if (query.trim()) {
      setSearchTerm(query.trim())
      setActiveGenre(null)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  function handleGenre(id) {
    setActiveGenre(prev => prev === id ? null : id)
    setSearchTerm("")
    setQuery("")
  }

  function handleClear() {
    setQuery("")
    setSearchTerm("")
    setActiveGenre(null)
  }

  const sectionLabel = searchTerm
    ? `Results for "${searchTerm}"`
    : activeGenre
    ? GENRES.find(g => g.id === activeGenre)?.name
    : "Popular Right Now"

  return (
    <div style={{ padding: "30px" }}>

      {/* Search bar */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: "#1e1e2a",
            border: "1px solid #2a2a3a",
            color: "#e8e6f0",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: "#e63946", border: "none", color: "#fff",
            padding: "10px 20px", borderRadius: "8px",
            cursor: "pointer", fontSize: "14px"
          }}
        >
          Search
        </button>
        {(searchTerm || activeGenre) && (
          <button
            onClick={handleClear}
            style={{
              background: "transparent", border: "1px solid #2a2a3a",
              color: "#888899", padding: "10px 16px", borderRadius: "8px",
              cursor: "pointer", fontSize: "14px"
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Genre filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {GENRES.map(genre => (
          <button
            key={genre.id}
            onClick={() => handleGenre(genre.id)}
            style={{
              background: activeGenre === genre.id ? "#e63946" : "#1e1e2a",
              border: activeGenre === genre.id ? "1px solid #e63946" : "1px solid #2a2a3a",
              color: activeGenre === genre.id ? "#fff" : "#888899",
              padding: "5px 14px", borderRadius: "20px",
              cursor: "pointer", fontSize: "12px"
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Section label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "500" }}>{sectionLabel}</h2>
        {movies.length > 0 && (
          <span style={{ fontSize: "13px", color: "#888899" }}>{movies.length} movies</span>
        )}
      </div>

      {loading && (
        <div style={{ color: "#888899", fontSize: "14px" }}>Loading...</div>
      )}

      {error && (
        <div style={{ color: "#e63946", fontSize: "14px" }}>Error: {error}</div>
      )}

      {!loading && !error && (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date?.slice(0, 4)}
              rating={movie.vote_average?.toFixed(1)}
              poster={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null
              }
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default HomePage