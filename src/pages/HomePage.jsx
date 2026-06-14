import { useState, useEffect, useRef } from 'react'
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
  const [page, setPage] = useState(2)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)

  function buildUrl(pageNum) {
    if (searchTerm) return "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + encodeURIComponent(searchTerm) + "&page=" + pageNum
    if (activeGenre) return "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&with_genres=" + activeGenre + "&sort_by=popularity.desc&page=" + pageNum
    return "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY + "&page=" + pageNum
  }

  useEffect(function() {
    setLoading(true)
    setError(null)
    setPage(2)
    setMovies([])
    Promise.all([
      fetch(buildUrl(1)).then(function(r) { return r.json() }),
      fetch(buildUrl(2)).then(function(r) { return r.json() })
    ])
      .then(function(results) {
        var combined = [...(results[0].results || []), ...(results[1].results || [])]
          .filter(function(m) { return m.poster_path })
          .slice(0, 27)
        setMovies(combined)
        setTotalPages(Math.min(results[0].total_pages, 20))
        setLoading(false)
      })
      .catch(function(err) { setError(err.message); setLoading(false) })
  }, [searchTerm, activeGenre])

  useEffect(function() {
    if (query.trim().length < 2) { setSuggestions([]); setShowSuggestions(false); return }
    var timer = setTimeout(function() {
      fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + encodeURIComponent(query) + "&page=1")
        .then(function(r) { return r.json() })
        .then(function(data) {
          var results = (data.results || []).filter(function(m) { return m.poster_path }).slice(0, 6)
          setSuggestions(results)
          setShowSuggestions(true)
        })
    }, 300)
    return function() { clearTimeout(timer) }
  }, [query])

  useEffect(function() {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handleClick)
    return function() { document.removeEventListener('mousedown', handleClick) }
  }, [])

  function loadMore() {
    var nextPage = page + 1
    setLoadingMore(true)
    fetch(buildUrl(nextPage))
      .then(function(r) { return r.json() })
      .then(function(data) {
        setMovies(function(prev) { return [...prev, ...(data.results || [])] })
        setPage(nextPage)
        setLoadingMore(false)
      })
      .catch(function() { setLoadingMore(false) })
  }

  function handleSearch() {
    if (query.trim()) { setSearchTerm(query.trim()); setActiveGenre(null); setShowSuggestions(false) }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') setShowSuggestions(false)
  }

  function handleSuggestionClick(movie) {
    setQuery(movie.title)
    setSearchTerm(movie.title)
    setActiveGenre(null)
    setShowSuggestions(false)
  }

  function handleGenre(id) {
    setActiveGenre(function(prev) { return prev === id ? null : id })
    setSearchTerm("")
    setQuery("")
    setShowSuggestions(false)
  }

  function handleClear() {
    setQuery("")
    setSearchTerm("")
    setActiveGenre(null)
    setShowSuggestions(false)
  }

  var sectionLabel = searchTerm
    ? "Results for \"" + searchTerm + "\""
    : activeGenre
    ? (GENRES.find(function(g) { return g.id === activeGenre }) || {}).name
    : "Popular Right Now"

  return (
    <div style={{ padding: "30px" }}>

      <div ref={searchRef} style={{ position: "relative", marginBottom: "16px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={function(e) { setQuery(e.target.value) }}
            onKeyDown={handleKeyDown}
            onFocus={function() { if (suggestions.length > 0) setShowSuggestions(true) }}
            style={{ flex: 1, background: "#1e1e2a", border: "1px solid #2a2a3a", color: "#e8e6f0", padding: "10px 16px", borderRadius: "8px", fontSize: "14px", outline: "none" }}
          />
          <button onClick={handleSearch} style={{ background: "#e63946", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>Search</button>
          {(searchTerm || activeGenre) && (
            <button onClick={handleClear} style={{ background: "transparent", border: "1px solid #2a2a3a", color: "#888899", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>Clear</button>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1e1e2a", border: "1px solid #2a2a3a", borderRadius: "8px", marginTop: "4px", zIndex: 100, overflow: "hidden" }}>
            {suggestions.map(function(movie) {
              return (
                <div
                  key={movie.id}
                  onClick={function() { handleSuggestionClick(movie) }}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", cursor: "pointer", borderBottom: "0.5px solid #2a2a3a" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#2a2a3a" }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "transparent" }}
                >
                  <img src={"https://image.tmdb.org/t/p/w92" + movie.poster_path} alt={movie.title} style={{ width: "32px", height: "48px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "13px", color: "#e8e6f0", fontWeight: "500" }}>{movie.title}</div>
                    <div style={{ fontSize: "11px", color: "#888899", marginTop: "2px" }}>{movie.release_date?.slice(0, 4)} &nbsp; {"★"} {movie.vote_average?.toFixed(1)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {GENRES.map(function(genre) {
          return (
            <button key={genre.id} onClick={function() { handleGenre(genre.id) }} style={{ background: activeGenre === genre.id ? "#e63946" : "#1e1e2a", border: activeGenre === genre.id ? "1px solid #e63946" : "1px solid #2a2a3a", color: activeGenre === genre.id ? "#fff" : "#888899", padding: "5px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }}>
              {genre.name}
            </button>
          )
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "500", color: "#fff" }}>{sectionLabel}</h2>
        {movies.length > 0 && <span style={{ fontSize: "13px", color: "#888899" }}>{movies.length} movies loaded</span>}
      </div>

      {loading && <div style={{ color: "#888899", fontSize: "14px", padding: "40px 0", textAlign: "center" }}>Loading movies...</div>}
      {error && <div style={{ color: "#e63946", fontSize: "14px" }}>Error: {error}</div>}

      {!loading && !error && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: "16px" }}>
            {movies.map(function(movie) {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  year={movie.release_date?.slice(0, 4)}
                  rating={movie.vote_average?.toFixed(1)}
                  poster={movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : null}
                />
              )
            })}
          </div>

          {movies.length > 0 && page < totalPages && (
            <div style={{ textAlign: "center", marginTop: "48px", marginBottom: "20px" }}>
              <div style={{ color: "#888899", fontSize: "12px", marginBottom: "12px" }}>Showing {movies.length} movies</div>
              <button
                onClick={loadMore}
                disabled={loadingMore}
                style={{ background: "transparent", border: "1px solid #e63946", color: loadingMore ? "#888899" : "#e63946", padding: "12px 40px", borderRadius: "30px", cursor: loadingMore ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "500" }}
                onMouseEnter={function(e) { if (!loadingMore) { e.target.style.background = "#e63946"; e.target.style.color = "#fff" } }}
                onMouseLeave={function(e) { if (!loadingMore) { e.target.style.background = "transparent"; e.target.style.color = "#e63946" } }}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
              <div style={{ color: "#444", fontSize: "11px", marginTop: "10px" }}>Page {page} of {totalPages}</div>
            </div>
          )}

          {movies.length > 0 && page >= totalPages && (
            <div style={{ textAlign: "center", marginTop: "40px", color: "#444", fontSize: "13px" }}>You have reached the end</div>
          )}
        </div>
      )}

    </div>
  )
}

export default HomePage
