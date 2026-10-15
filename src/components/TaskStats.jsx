import { useMemo } from 'react'
import { CheckCircle, Clock, ListTodo, TrendingUp } from 'lucide-react'

export const TaskStats = ({ tasks }) => {
  // useMemo para calcular métricas complejas sólo cuando cambie la lista de tareas
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const pending = total - completed
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

    const highPriorityPending = tasks.filter(
      (t) => !t.completed && t.priority === 'alta'
    ).length

    return { total, completed, pending, percentage, highPriorityPending }
  }, [tasks])

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper icon-blue">
          <ListTodo size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total de Tareas</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper icon-emerald">
          <CheckCircle size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper icon-amber">
          <Clock size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pendientes</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper icon-purple">
          <TrendingUp size={22} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{stats.percentage}%</span>
          <span className="stat-label">Progreso Global</span>
        </div>
      </div>
    </div>
  )
}

export default TaskStats
