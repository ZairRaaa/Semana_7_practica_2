import { useState, useEffect, useCallback } from 'react'

/**
 * Custom Hook para sincronizar estado con localStorage de manera segura y reactiva
 * @param {string} key - Clave con la que se guardará en localStorage
 * @param {any} initialValue - Valor inicial o función inicializadora
 * @returns {[any, Function, Function]} [storedValue, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Lectura inicial segura desde localStorage
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        return JSON.parse(item)
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue
    } catch (error) {
      console.warn(`Error al leer la clave "${key}" en localStorage:`, error)
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  // Función setter con soporte para actualizaciones basadas en el estado previo
  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((currentValue) => {
          const valueToStore =
            typeof value === 'function' ? value(currentValue) : value

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
            // Disparar evento personalizado para sincronizar instancias en la misma pestaña
            window.dispatchEvent(new CustomEvent('local-storage-sync', { detail: { key, valueToStore } }))
          }

          return valueToStore
        })
      } catch (error) {
        console.error(`Error al guardar la clave "${key}" en localStorage:`, error)
      }
    },
    [key]
  )

  // Función para eliminar la clave
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        setStoredValue(typeof initialValue === 'function' ? initialValue() : initialValue)
      }
    } catch (error) {
      console.error(`Error al remover la clave "${key}" en localStorage:`, error)
    }
  }, [key, initialValue])

  // useEffect con Cleanup: Sincronización con otras pestañas y eventos del storage
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue))
        } catch {
          setStoredValue(event.newValue)
        }
      }
    }

    const handleCustomSync = (event) => {
      if (event.detail && event.detail.key === key) {
        setStoredValue(event.detail.valueToStore)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage-sync', handleCustomSync)

    // Cleanup activo para prevenir fugas de memoria
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage-sync', handleCustomSync)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
