import { createContext, useState, useEffect, useContext, useCallback } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Inicialización perezosa leyendo de localStorage o preferencia del sistema
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app-theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // Alternar entre tema claro y oscuro
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  // useEffect con cleanup: aplica clases al body/html y escucha cambios de preferencia del sistema
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
      body.classList.add('dark')
    } else {
      root.setAttribute('data-theme', 'light')
      body.classList.remove('dark')
    }

    try {
      localStorage.setItem('app-theme', theme)
    } catch (e) {
      console.error('Error al guardar tema en localStorage:', e)
    }

    // Cleanup: Restablecer estado o listeners si el componente se desmonta
    return () => {
      // Limpieza de efecto para evitar fugas de memoria y desincronización
      root.removeAttribute('data-theme')
      body.classList.remove('dark')
    }
  }, [theme])

  // Sincronización entre pestañas mediante el evento 'storage' con cleanup activo
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'app-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook de acceso directo al contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider')
  }
  return context
}
