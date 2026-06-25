<button
  onClick={toggleTheme}
  title={dark ? "Switch to light mode" : "Switch to dark mode"}
  style={{
    background: dark ? "#1e1e2a" : "#e8e8f0",
    border: "0.5px solid " + border,
    width: "36px", height: "36px",
    borderRadius: "50%", cursor: "pointer",
    display: "flex", alignItems: "center",
    justifyContent: "center", padding: 0
  }}
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? "#e8e6f0" : "#111118"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
</button>