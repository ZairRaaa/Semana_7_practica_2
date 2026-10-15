import { memo } from 'react'
import { CheckCircle2, Circle, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react'

/**
 * TaskItem optimizado con React.memo para evitar re-renders innecesarios.
 * Se beneficia directamente de los callbacks estabilizados con useCallback.
 */
export const TaskItem = memo(({ task, onToggle, onRemove }) => {
  const priorityColors = {
    alta: 'priority-high',
    media: 'priority-medium',
    baja: 'priority-low',
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <li className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <button
          type="button"
          className="btn-toggle"
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {task.completed ? (
            <CheckCircle2 className="icon-completed" size={22} />
          ) : (
            <Circle className="icon-pending" size={22} />
          )}
        </button>

        <div className="task-details">
          <p className="task-title">{task.title}</p>
          <div className="task-meta">
            <span className={`badge-priority ${priorityColors[task.priority] || ''}`}>
              <AlertCircle size={12} />
              {task.priority.toUpperCase()}
            </span>
            <span className="badge-category">
              <Tag size={12} />
              {task.category}
            </span>
            <span className="task-date">
              <Calendar size={12} />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn-delete"
          onClick={() => onRemove(task.id)}
          title="Eliminar tarea"
          aria-label="Eliminar tarea"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  )
})

TaskItem.displayName = 'TaskItem'

export default TaskItem
