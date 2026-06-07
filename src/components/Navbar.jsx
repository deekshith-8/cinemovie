import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'

function Navbar() {
  const { watchlist } = useWatchlist()

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 30px",
      background: "#111118",
      borderBottom: "1px solid #2a2a3a",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{
        color: "#e63946",
        fontSize: "22px",
        fontWeight: "700",
        textDecoration: "none",
        letterSpacing: "1px"
      }}>
        CineMovie
      </Link>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link to="/" style={{
          color: "#888899",
          textDecoration: "none",
          fontSize: "14px",
          padding: "6px 14px",
          borderRadius: "20px"
        }}>
          Discover
        </Link>
        <Link to="/watchlist" style={{
          color: "#888899",
          textDecoration: "none",
          fontSize: "14px",
          padding: "6px 14px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          Watchlist
          {watchlist.length > 0 && (
            <span style={{
              background: "#e63946",
              color: "#fff",
              fontSize: "11px",
              padding: "1px 6px",
              borderRadius: "10px",
              fontWeight: "500"
            }}>
              {watchlist.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar