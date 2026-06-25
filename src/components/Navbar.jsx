import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { watchlist } = useWatchlist()
  const { dark, toggleTheme } = useTheme()

  const bg = dark ? "#111118" : "#ffffff"
  const border = dark ? "#2a2a3a" : "#e0e0ea"
  const linkColor = dark ? "#888899" : "#555566"
  const iconColor = dark ? "#e8e6f0" : "#111118"

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 30px", background: bg,
      borderBottom: "0.5px solid " + border,
      position: "sticky", top: 0, zIndex: 100
    }}>

      {/* Left: Logo + theme toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link to="/" style={{ color: "#e63946", fontSize: "22px", fontWeight: "700", textDecoration: "none", letterSpacing: "1px" }}>
          CineMovie
        </Link>

        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            background: "none", border: "none",
            cursor: "pointer", padding: "4px",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          {dark ? (
            // Sun icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            // Moon icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Right: Nav links + login */}
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
          title="Login"
          style={{
            background: dark ? "#1e1e2a" : "#e8e8f0",
            border: "0.5px solid " + border,
            width: "36px", height: "36px",
            borderRadius: "50%", cursor: "pointer",
            display: "flex", alignItems: "center",
            justifyContent: "center", padding: 0
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar