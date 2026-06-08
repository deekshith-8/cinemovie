import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useWatchlist } from '../context/WatchlistContext'

const API_KEY = 'b2368eef2bb9277076f02638705dccc1'
const IMG = 'https://image.tmdb.org/t/p/w500'

function OTTLogo({ provider, link, label }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      title={label + " on " + provider.provider_name}
      style={{ display: "inline-block" }}
    >
      <img
        src={"https://image.tmdb.org/t/p/w92" + provider.logo_path}
        alt={provider.provider_name}
        style={{ width: "34px", height: "34px", borderRadius: "8px", objectFit: "cover", cursor: "pointer" }}
      />
    </a>
  )
}

function DetailPage() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleWatchlist, inWatchlist } = useWatchlist()

  const { data: movie, loading, error } = useFetch(
    "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY + "&append_to_response=credits"
  )
  const { data: videos } = useFetch(
    "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + API_KEY
  )
  const { data: providers } = useFetch(
    "https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=" + API_KEY
  )

  if (loading) return <div style={{ padding: "40px", color: "#888" }}>Loading...</div>
  if (error) return <div style={{ padding: "40px", color: "#e63946" }}>Error: {error}</div>
  if (!movie) return null

  const cast = movie.credits?.cast?.slice(0, 8) || []
  const runtime = movie.runtime
    ? Math.floor(movie.runtime / 60) + "h " + (movie.runtime % 60) + "m"
    : "N/A"

  const indiaProviders = providers?.results?.IN || null
  const watchLink = indiaProviders ? indiaProviders.link : "#"
  const streaming = indiaProviders?.flatrate || []
  const rent = indiaProviders?.rent || []
  const buy = indiaProviders?.buy || []
  const inTheatres = movie.release_date
    ? new Date(movie.release_date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    : false
  const noProviders = !inTheatres && streaming.length === 0 && rent.length === 0 && buy.length === 0
  const trailer = videos?.results?.find(function(v) { return v.type === "Trailer" && v.site === "YouTube" })

  return (
    <div style={{ padding: "30px", maxWidth: "960px", margin: "0 auto" }}>

      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent", border: "1px solid #2a2a3a",
          color: "#888899", padding: "7px 16px", borderRadius: "8px",
          cursor: "pointer", marginBottom: "24px", fontSize: "13px"
        }}
      >
        Back
      </button>

      {/* Hero */}
      <div style={{ display: "flex", gap: "28px", marginBottom: "28px" }}>
        {movie.poster_path
          ? <img src={IMG + movie.poster_path} alt={movie.title}
              style={{ width: "185px", borderRadius: "10px", flexShrink: 0, alignSelf: "flex-start" }} />
          : <div style={{ width: "185px", height: "278px", background: "#1e1e2a", borderRadius: "10px", flexShrink: 0 }} />
        }

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "30px", marginBottom: "6px", color: "#fff", lineHeight: 1.2 }}>
            {movie.title}
          </h1>

          {movie.tagline && (
            <p style={{ color: "#888899", fontStyle: "italic", marginBottom: "14px", fontSize: "13px" }}>
              "{movie.tagline}"
            </p>
          )}

          <div style={{ display: "flex", gap: "20px", marginBottom: "14px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "10px", color: "#888899", marginBottom: "2px" }}>RATING</div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#ffd166" }}>
                {"\u2605"} {movie.vote_average?.toFixed(1)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: "#888899", marginBottom: "2px" }}>RUNTIME</div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#fff" }}>{runtime}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: "#888899", marginBottom: "2px" }}>YEAR</div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#fff" }}>{movie.release_date?.slice(0, 4)}</div>
            </div>
            {movie.budget > 0 && (
              <div>
                <div style={{ fontSize: "10px", color: "#888899", marginBottom: "2px" }}>BUDGET</div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#fff" }}>
                  {"$" + (movie.budget / 1e6).toFixed(0) + "M"}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
            {movie.genres?.map(g => (
              <span key={g.id} style={{
                fontSize: "11px", padding: "3px 10px",
                border: "1px solid #2a2a3a", borderRadius: "20px", color: "#888899"
              }}>
                {g.name}
              </span>
            ))}
          </div>

          <p style={{ fontSize: "13px", color: "#b0afc0", lineHeight: "1.7", marginBottom: "16px" }}>
            {movie.overview}
          </p>

          <button
            onClick={() => toggleWatchlist({
              id: movie.id, title: movie.title,
              poster_path: movie.poster_path,
              vote_average: movie.vote_average,
              release_date: movie.release_date
            })}
            style={{
              background: inWatchlist(movie.id) ? "transparent" : "#e63946",
              border: inWatchlist(movie.id) ? "1px solid #e63946" : "none",
              color: inWatchlist(movie.id) ? "#e63946" : "#fff",
              padding: "9px 22px", borderRadius: "8px",
              fontSize: "13px", fontWeight: "500", cursor: "pointer"
            }}
          >
            {inWatchlist(movie.id) ? "\u2713 In Watchlist" : "+ Add to Watchlist"}
          </button>
        </div>
      </div>

      {/* Where to watch */}
      <div style={{
        background: "#111118", border: "0.5px solid #2a2a3a",
        borderRadius: "10px", padding: "14px 18px", marginBottom: "24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span style={{ fontSize: "15px", fontWeight: "500", color: "#fff" }}>Where to watch</span>
          <span style={{
            fontSize: "11px", color: "#888899", background: "#1e1e2a",
            padding: "2px 8px", borderRadius: "20px", border: "0.5px solid #2a2a3a"
          }}>
            India
          </span>
        </div>

        {noProviders && (
          <p style={{ fontSize: "13px", color: "#888899", margin: 0 }}>
            Not available on any platform in India right now
          </p>
        )}

        {inTheatres && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", color: "#888899", width: "75px", flexShrink: 0 }}>Theatres</span>
            <span style={{
              border: "1px solid #e63946", color: "#e63946",
              fontSize: "11px", padding: "3px 12px", borderRadius: "20px"
            }}>
              Now showing
            </span>
          </div>
        )}

        {streaming.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", color: "#888899", width: "75px", flexShrink: 0 }}>Streaming</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {streaming.map(p => (
                <OTTLogo key={p.provider_id} provider={p} link={watchLink} label="Stream" />
              ))}
            </div>
          </div>
        )}

        {rent.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", color: "#888899", width: "75px", flexShrink: 0 }}>Rent</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {rent.map(p => (
                <OTTLogo key={p.provider_id} provider={p} link={watchLink} label="Rent" />
              ))}
            </div>
          </div>
        )}

        {buy.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#888899", width: "75px", flexShrink: 0 }}>Buy</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {buy.map(p => (
                <OTTLogo key={p.provider_id} provider={p} link={watchLink} label="Buy" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer */}
      {trailer && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "14px", color: "#fff" }}>
            Trailer
          </h2>
          <div style={{
            position: "relative", paddingBottom: "56.25%",
            height: 0, borderRadius: "10px", overflow: "hidden",
            border: "0.5px solid #2a2a3a"
          }}>
            <iframe
              src={"https://www.youtube.com/embed/" + trailer.key}
              title={trailer.name}
              allowFullScreen
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "100%", border: "none"
              }}
            />
          </div>
        </div>
      )}

      {/* Cast */}
      {cast.length > 0 && (
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "14px", color: "#fff" }}>Cast</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {cast.map(person => (
              <div key={person.id} style={{
                background: "#1e1e2a", borderRadius: "8px",
                overflow: "hidden", width: "80px", textAlign: "center"
              }}>
                {person.profile_path
                  ? <img src={IMG + person.profile_path} alt={person.name}
                      style={{ width: "80px", height: "100px", objectFit: "cover", display: "block" }} />
                  : <div style={{
                      width: "80px", height: "100px", background: "#2a2a3a",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
                    }}>
                      {"\uD83D\uDC64"}
                    </div>
                }
                <div style={{ padding: "6px 4px" }}>
                  <div style={{ fontSize: "10px", fontWeight: "500", lineHeight: "1.2", color: "#e8e6f0" }}>
                    {person.name}
                  </div>
                  <div style={{ fontSize: "9px", color: "#888899", marginTop: "2px", lineHeight: "1.2" }}>
                    {person.character}
                  </div>
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

