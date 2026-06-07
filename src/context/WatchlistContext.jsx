import { createContext, useContext, useState } from 'react'

// Step 1: create the context object
// This is like creating an empty box that will hold our data
const WatchlistContext = createContext(null)

// Step 2: create the Provider component
// This wraps the app and makes watchlist data available everywhere
function WatchlistProvider({ children }) {

  const [watchlist, setWatchlist] = useState([])

  // Add or remove a movie from watchlist
  function toggleWatchlist(movie) {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id)
      if (exists) {
        // already in watchlist -- remove it
        return prev.filter(m => m.id !== movie.id)
      } else {
        // not in watchlist -- add it
        return [...prev, movie]
      }
    })
  }

  // Check if a movie is already in the watchlist
  function inWatchlist(id) {
    return watchlist.some(m => m.id === id)
  }

  // Everything inside `value` is accessible to any component
  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, inWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

// Step 3: custom hook so components don't import context directly
// Instead of: const { watchlist } = useContext(WatchlistContext)
// They just do: const { watchlist } = useWatchlist()
function useWatchlist() {
  return useContext(WatchlistContext)
}

export { WatchlistProvider, useWatchlist }