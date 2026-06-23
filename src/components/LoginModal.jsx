import { useState } from 'react'

function LoginModal({ dark, onClose }) {
  const [mode, setMode] = useState("login") // "login" or "signup"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const cardBg = dark ? "#15151f" : "#ffffff"
  const text = dark ? "#e8e6f0" : "#111118"
  const subtext = dark ? "#888899" : "#555566"
  const border = dark ? "#2a2a3a" : "#e0e0ea"
  const inputBg = dark ? "#1e1e2a" : "#f4f4f8"

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire up to your JWT / Google OAuth backend here
    console.log(mode, { name, email, password })
    onClose()
  }

  function handleGoogleLogin() {
    // TODO: wire up to your Google OAuth flow here
    console.log("Google login clicked")
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: cardBg,
          border: "0.5px solid " + border,
          borderRadius: "16px",
          padding: "32px",
          width: "360px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: text, fontSize: "20px", margin: 0 }}>
            {mode === "login" ? "Log In" : "Sign Up"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: subtext, fontSize: "20px", cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                background: inputBg, border: "0.5px solid " + border, borderRadius: "8px",
                padding: "10px 12px", color: text, fontSize: "14px", outline: "none"
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              background: inputBg, border: "0.5px solid " + border, borderRadius: "8px",
              padding: "10px 12px", color: text, fontSize: "14px", outline: "none"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              background: inputBg, border: "0.5px solid " + border, borderRadius: "8px",
              padding: "10px 12px", color: text, fontSize: "14px", outline: "none"
            }}
          />

          <button
            type="submit"
            style={{
              background: "#e63946", color: "#fff", border: "none",
              borderRadius: "8px", padding: "11px", fontSize: "14px",
              fontWeight: "600", cursor: "pointer", marginTop: "4px"
            }}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "18px 0" }}>
          <div style={{ flex: 1, height: "1px", background: border }} />
          <span style={{ color: subtext, fontSize: "12px" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: border }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", background: inputBg, border: "0.5px solid " + border,
            borderRadius: "8px", padding: "10px", color: text, fontSize: "14px",
            cursor: "pointer"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", color: subtext, fontSize: "13px", marginTop: "18px" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            style={{ color: "#e63946", cursor: "pointer", fontWeight: "600" }}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginModal
