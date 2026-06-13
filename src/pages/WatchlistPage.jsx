import { useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'

function WatchlistPage() {
  const navigate = useNavigate()
  const { watchlist, toggleWatchlist } = useWatchlist()

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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "16px" }}>
        {watchlist.map(movie => (
          <div key={movie.id} style={{ position: "relative" }}>

            {/* Movie card */}
            <div
              onClick={() => navigate("/movie/" + movie.id)}
              style={{
                background: "#1e1e2a", borderRadius: "10px",
                overflow: "hidden", cursor: "pointer",
                transition: "transform 0.2s", width: "100%"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {movie.poster_path
                ? <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block" }}
                  />
                : <div style={{
                    width: "100%", aspectRatio: "2/3", background: "#2a2a3a",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#888"
                  }}>
                    No Image
                  </div>
              }
              <div style={{ padding: "10px" }}>
                <div style={{
                  fontSize: "13px", fontWeight: "500", color: "#e8e6f0",
                  marginBottom: "4px", lineHeight: "1.3",
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden"
                }}>
                  {movie.title}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#888899" }}>
                    {movie.release_date?.slice(0, 4)}
                  </span>
                  <span style={{ fontSize: "11px", color: "#ffd166", fontWeight: "500" }}>
                    {"\u2605"} {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={e => { e.stopPropagation(); toggleWatchlist(movie) }}
              title="Remove from watchlist"
              style={{
                position: "absolute", top: "8px", right: "8px",
                background: "rgba(230, 57, 70, 0.9)",
                border: "none", color: "#fff",
                width: "26px", height: "26px",
                borderRadius: "50%", cursor: "pointer",
                fontSize: "14px", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontWeight: "500"
              }}
            >
              {"\u00D7"}
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default WatchlistPage