import { useState, useRef, useEffect } from 'react'
import { PlusCircle, Tag, AlertCircle } from 'lucide-react'

export const TaskForm = ({ onAddTask }) => {
  // useState para UI local del formulario
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('media')
  const [category, setCategory] = useState('Desarrollo')
  const [error, setError] = useState('')

  // useRef para manipular el DOM del input (auto-focus y enfoque manual)
  const inputTitleRef = useRef(null)

  // Enfoque inicial al montar el componente sin provocar re-render
  useEffect(() => {
    if (inputTitleRef.current) {
      inputTitleRef.current.focus()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Por favor ingresa un título para la tarea.')
      inputTitleRef.current?.focus()
      return
    }

    onAddTask({
      title: title.trim(),
      priority,
      category,
    })

    // Resetear estado local
    setTitle('')
    setError('')

    // Devolver el foco al input con useRef
    inputTitleRef.current?.focus()
  }

  return (
    <form className="task-form-card" onSubmit={handleSubmit}>
      <h3 className="form-title">
        <PlusCircle size={20} className="text-accent" />
        Nueva Tarea
      </h3>

      <div className="form-group">
        <input
          ref={inputTitleRef}
          type="text"
          className={`input-field ${error ? 'input-error' : ''}`}
          placeholder="¿Qué tarea necesitas completar hoy?..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError('')
          }}
        />
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="form-row">
        <div className="select-container">
          <label htmlFor="priority-select" className="select-label">
            <AlertCircle size={14} /> Prioridad
          </label>
          <select
            id="priority-select"
            className="select-field"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <div className="select-container">
          <label htmlFor="category-select" className="select-label">
            <Tag size={14} /> Categoría
          </label>
          <select
            id="category-select"
            className="select-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Desarrollo">Desarrollo</option>
            <option value="Diseño">Diseño</option>
            <option value="Estudio">Estudio</option>
            <option value="QA">QA & Pruebas</option>
            <option value="General">General</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          <PlusCircle size={18} />
          Agregar Tarea
        </button>
      </div>
    </form>
  )
}

export default TaskForm
