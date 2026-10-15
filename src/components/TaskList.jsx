import { useMemo, useCallback, useRef, useEffect } from 'react'
import TaskItem from './TaskItem'
import { Inbox, Sparkles } from 'lucide-react'

export const TaskList = ({
  tasks,
  filter,
  sort,
  searchQuery,
  onRemove,
  onToggle,
  inputFocusTrigger,
}) => {
  // useRef para acceso directo al nodo DOM
  const listContainerRef = useRef(null)

  // useMemo para filtrar y ordenar tareas sin recalcular en cada render arbitrario
  const processedTasks = useMemo(() => {
    // 1. Filtrado por estado
    let result = tasks.filter((task) => {
      if (filter === 'pending') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })

    // 2. Filtrado por texto de búsqueda
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(q) ||
          task.category.toLowerCase().includes(q)
      )
    }

    // 3. Ordenamiento
    const priorityWeight = { alta: 3, media: 2, baja: 1 }

    result.sort((a, b) => {
      if (sort === 'priority') {
        const weightDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0)
        if (weightDiff !== 0) return weightDiff
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sort === 'desc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      // 'asc' (más recientes primero por defecto)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return result
  }, [tasks, filter, sort, searchQuery])

  // useCallback para estabilizar handlers pasados a componentes hijos memoizados (TaskItem)
  const handleRemove = useCallback(
    (id) => {
      onRemove(id)
    },
    [onRemove]
  )

  const handleToggle = useCallback(
    (id) => {
      onToggle(id)
    },
    [onToggle]
  )

  // useEffect con useRef: Scroll suave o feedback cuando se agrega una nueva tarea
  useEffect(() => {
    if (inputFocusTrigger && listContainerRef.current) {
      listContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [inputFocusTrigger, tasks.length])

  return (
    <div className="task-list-wrapper" ref={listContainerRef}>
      <div className="task-list-header">
        <h3 className="section-title">
          <Sparkles size={18} className="text-accent" />
          Tareas Registradas ({processedTasks.length} de {tasks.length})
        </h3>
      </div>

      {processedTasks.length === 0 ? (
        <div className="empty-state">
          <Inbox size={48} className="empty-icon" />
          <h4>No se encontraron tareas</h4>
          <p>
            {searchQuery
              ? 'No hay tareas que coincidan con tu búsqueda.'
              : filter !== 'all'
              ? `No tienes tareas en estado "${filter}".`
              : 'Empieza agregando tu primera tarea en el formulario superior.'}
          </p>
        </div>
      ) : (
        <ul className="task-items-list">
          {processedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
