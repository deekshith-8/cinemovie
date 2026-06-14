import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import { WatchlistProvider } from './context/WatchlistContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import WatchlistPage from './pages/WatchlistPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(function() { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ThemedApp() {
  const { dark } = useTheme()
  useEffect(function() {
    document.body.style.background = dark ? "#0a0a0f" : "#f0f0f5"
    document.body.style.color = dark ? "#ffffff" : "#111118"
  }, [dark])

  return (
    <HashRouter>
      <WatchlistProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </WatchlistProvider>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </StrictMode>
)