import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { watchlist } = useWatchlist()
  const { dark, toggleTheme } = useTheme()

  const bg = dark ? "#111118" : "#ffffff"
  const border = dark ? "#2a2a3a" : "#e0e0ea"
  const linkColor = dark ? "#888899" : "#555566"

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 30px", background: bg,
      borderBottom: "0.5px solid " + border,
      position: "sticky", top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ color: "#e63946", fontSize: "22px", fontWeight: "700", textDecoration: "none", letterSpacing: "1px" }}>
        CineMovie
      </Link>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link to="/" style={{ color: linkColor, textDecoration: "none", fontSize: "14px", padding: "6px 14px", borderRadius: "20px" }}>
          Discover
        </Link>
        <Link to="/watchlist" style={{ color: linkColor, textDecoration: "none", fontSize: "14px", padding: "6px 14px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
          Watchlist
          {watchlist.length > 0 && (
            <span style={{ background: "#e63946", color: "#fff", fontSize: "11px", padding: "1px 6px", borderRadius: "10px", fontWeight: "500" }}>
              {watchlist.length}
            </span>
          )}
        </Link>

        <button
          onClick={toggleTheme}
          style={{
            background: dark ? "#1e1e2a" : "#e8e8f0",
            border: "0.5px solid " + border,
            color: dark ? "#e8e6f0" : "#111118",
            width: "36px", height: "36px",
            borderRadius: "50%", cursor: "pointer",
            fontSize: "16px", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontWeight: "500"
          }}
        >
          {dark ? "D" : "L"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar