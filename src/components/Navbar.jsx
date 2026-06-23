import { Link, useLocation } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { watchlist } = useWatchlist()
  const { dark, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  const bg = dark ? "rgba(17,17,24,0.85)" : "rgba(255,255,255,0.85)"
  const border = dark ? "#2a2a3a" : "#e0e0ea"

  function linkStyle(path) {
    const active = pathname === path
    return {
      color: active ? "#e63946" : dark ? "#888899" : "#555566",
      textDecoration: "none",
      fontSize: "14px",
      padding: "6px 14px",
      borderRadius: "20px",
      background: active ? (dark ? "#2a1018" : "#fdecea") : "transparent",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.15s"
    }
  }

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 30px",
      background: bg,
      borderBottom: "0.5px solid " + border,
      position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)"
    }}>
      <Link to="/" style={{ color: "#e63946", fontSize: "22px", fontWeight: "700", textDecoration: "none", letterSpacing: "1px" }}>
        CineMovie
      </Link>

      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>Discover</Link>
        <Link to="/watchlist" style={linkStyle("/watchlist")}>
          Watchlist
          {watchlist.length > 0 && (
            <span style={{ background: "#e63946", color: "#fff", fontSize: "11px", padding: "1px 6px", borderRadius: "10px", fontWeight: "500" }}>
              {watchlist.length}
            </span>
          )}
        </Link>

        <button
          onClick={toggleTheme}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: dark ? "#1e1e2a" : "#e8e8f0",
            border: "0.5px solid " + border,
            width: "36px", height: "36px",
            borderRadius: "50%", cursor: "pointer",
            display: "flex", alignItems: "center",
            justifyContent: "center", padding: 0,
            marginLeft: "8px"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? "#e8e6f0" : "#111118"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar