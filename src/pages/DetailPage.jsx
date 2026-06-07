import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useWatchlist } from '../context/WatchlistContext'

const API_KEY = 'b2368eef2bb9277076f02638705dccc1'
const IMG = 'https://image.tmdb.org/t/p/w500'

function DetailPage() {

  // useParams reads the :id from the URL
  // if URL is /movie/550, then id = "550"
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleWatchlist, inWatchlist } = useWatchlist()

  // append_to_response=credits fetches cast in the same request
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`

  const { data: movie, loading, error } = useFetch(url)

  if (loading) return (
    <div style={{ padding: "40px", color: "#888" }}>Loading...</div>
  )

  if (error) return (
    <div style={{ padding: "40px", color: "#e63946" }}>Error: {error}</div>
  )

  if (!movie) return null

  const cast = movie.credits?.cast?.slice(0, 8) || []
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A"

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "1px solid #2a2a3a",
          color: "#888899",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "24px",
          fontSize: "14px"
        }}
      >
        Back
      </button>

      {/* Movie hero section */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>

        {/* Poster */}
        {movie.poster_path
          ? <img
              src={IMG + movie.poster_path}
              alt={movie.title}
              style={{ width: "200px", borderRadius: "10px", flexShrink: 0 }}
            />
          : <div style={{
              width: "200px", height: "300px", background: "#1e1e2a",
              borderRadius: "10px", flexShrink: 0
            }} />
        }

        {/* Info */}
        <div>
          <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
            {movie.title}
          </h1>

          {movie.tagline && (
            <p style={{ color: "#888899", fontStyle: "italic", marginBottom: "16px" }}>
              "{movie.tagline}"
            </p>
          )}

          {/* Stats row */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#888899", marginBottom: "2px" }}>RATING</div>
              <div style={{ color: "#ffd166", fontWeight: "500" }}>★ {movie.vote_average?.toFixed(1)}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#888899", marginBottom: "2px" }}>RUNTIME</div>
              <div>{runtime}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#888899", marginBottom: "2px" }}>YEAR</div>
              <div>{movie.release_date?.slice(0, 4)}</div>
            </div>
            {movie.budget > 0 && (
              <div>
                <div style={{ fontSize: "11px", color: "#888899", marginBottom: "2px" }}>BUDGET</div>
                <div>${(movie.budget / 1e6).toFixed(0)}M</div>
              </div>
            )}
          </div>

          {/* Genres */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            {movie.genres?.map(g => (
              <span key={g.id} style={{
                fontSize: "12px", padding: "3px 10px",
                border: "1px solid #2a2a3a", borderRadius: "20px", color: "#888899"
              }}>
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p style={{ fontSize: "14px", color: "#b0afc0", lineHeight: "1.7", marginBottom: "16px" }}>
  {movie.overview}
</p>

<button
  onClick={() => toggleWatchlist({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date
  })}
  style={{
    background: inWatchlist(movie.id) ? "transparent" : "#e63946",
    border: inWatchlist(movie.id) ? "1px solid #e63946" : "none",
    color: inWatchlist(movie.id) ? "#e63946" : "#fff",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  }}
>
  {inWatchlist(movie.id) ? "✓ In Watchlist" : "+ Add to Watchlist"}
</button>
        </div>
      </div>

      {/* Cast */}
      {cast.length > 0 && (
        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Cast</h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {cast.map(person => (
              <div key={person.id} style={{
                background: "#1e1e2a", borderRadius: "8px",
                overflow: "hidden", width: "90px", textAlign: "center"
              }}>
                {person.profile_path
                  ? <img
                      src={IMG + person.profile_path}
                      alt={person.name}
                      style={{ width: "90px", height: "110px", objectFit: "cover", display: "block" }}
                    />
                  : <div style={{
                      width: "90px", height: "110px", background: "#2a2a3a",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px"
                    }}>
                      👤
                    </div>
                }
                <div style={{ padding: "6px 4px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "500", lineHeight: "1.2" }}>{person.name}</div>
                  <div style={{ fontSize: "10px", color: "#888899", marginTop: "2px" }}>{person.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default DetailPage