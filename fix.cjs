const fs = require('fs')

const content = `import { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext(null)

function WatchlistProvider({ children }) {

  const [watchlist, setWatchlist] = useState(function() {
    try {
      const saved = localStorage.getItem('cinemovie-watchlist')
      return saved ? JSON.parse(saved) : []
    } catch(e) {
      return []
    }
  })

  useEffect(function() {
    localStorage.setItem('cinemovie-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  function toggleWatchlist(movie) {
    setWatchlist(function(prev) {
      const exists = prev.find(function(m) { return m.id === movie.id })
      if (exists) {
        return prev.filter(function(m) { return m.id !== movie.id })
      } else {
        return [...prev, movie]
      }
    })
  }

  function inWatchlist(id) {
    return watchlist.some(function(m) { return m.id === id })
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, inWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

function useWatchlist() {
  return useContext(WatchlistContext)
}

export { WatchlistProvider, useWatchlist }
`

fs.writeFileSync('src/context/WatchlistContext.jsx', content)
console.log('Done!')