import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)
  function toggleTheme() { setDark(function(prev) { return !prev }) }
  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() { return useContext(ThemeContext) }

export { ThemeProvider, useTheme }
