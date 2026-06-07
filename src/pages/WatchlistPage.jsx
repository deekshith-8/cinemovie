import { useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import MovieCard from '../components/MovieCard'
import '../components/MovieCard.css'

function WatchlistPage() {
  const navigate = useNavigate()
  const { watchlist } = useWatchlist()

  if (watchlist.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center", paddingTop: "80px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎞</div>
        <h2 style={{ marginBottom: "8px" }}>Your watchlist is empty</h2>
        <p style={{ color: "#888899", fontSize: "14px", marginBottom: "24px" }}>
          Go to a movie and click "+ Add to Watchlist"
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: "#e63946", border: "none", color: "#fff",
            padding: "10px 20px", borderRadius: "8px",
            cursor: "pointer", fontSize: "14px"
          }}
        >
          Browse Movies
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "8px", fontSize: "28px" }}>My Watchlist</h1>
      <p style={{ marginBottom: "24px", color: "#888899", fontSize: "14px" }}>
        {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {watchlist.map(movie => (
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
    </div>
  )
}

export default WatchlistPage