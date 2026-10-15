import { useMemo } from 'react'
import { PieChart, BarChart3, Layers, CheckCircle2 } from 'lucide-react'

export const TaskCharts = ({ tasks }) => {
  // useMemo para calcular métricas complejas de gráficos sin recalcular en renders ajenos
  const chartData = useMemo(() => {
    const total = tasks.length
    if (total === 0) {
      return {
        total: 0,
        completed: 0,
        completionRate: 0,
        categories: [],
        priorities: { alta: 0, media: 0, baja: 0 },
      }
    }

    const completed = tasks.filter((t) => t.completed).length
    const completionRate = Math.round((completed / total) * 100)

    // Agrupación por categorías
    const categoryCounts = {}
    const categoryColors = {
      Desarrollo: '#3b82f6',
      Diseño: '#8b5cf6',
      Estudio: '#10b981',
      QA: '#f59e0b',
      General: '#64748b',
    }

    tasks.forEach((t) => {
      const cat = t.category || 'General'
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    })

    const categories = Object.keys(categoryCounts).map((name) => ({
      name,
      count: categoryCounts[name],
      percentage: Math.round((categoryCounts[name] / total) * 100),
      color: categoryColors[name] || '#94a3b8',
    }))

    // Conteo por prioridades
    const priorities = {
      alta: tasks.filter((t) => t.priority === 'alta').length,
      media: tasks.filter((t) => t.priority === 'media').length,
      baja: tasks.filter((t) => t.priority === 'baja').length,
    }

    return {
      total,
      completed,
      completionRate,
      categories,
      priorities,
    }
  }, [tasks])

  // Cálculo SVG Donut Chart
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (chartData.completionRate / 100) * circumference

  return (
    <div className="charts-container">
      {/* Gráfico 1: Donut Circular de Eficiencia */}
      <div className="chart-card">
        <div className="chart-header">
          <PieChart size={18} className="text-accent" />
          <h4>Tasa de Cumplimiento</h4>
        </div>

        <div className="donut-wrapper">
          <svg className="donut-svg" viewBox="0 0 100 100" width="120" height="120">
            <circle
              className="donut-bg"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="9"
            />
            <circle
              className="donut-progress"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="donut-center-info">
            <span className="donut-percentage">{chartData.completionRate}%</span>
            <span className="donut-label">Finalizado</span>
          </div>
        </div>

        <div className="donut-legend">
          <div className="legend-item">
            <span className="legend-dot dot-completed"></span>
            <span>Completadas: <strong>{chartData.completed}</strong></span>
          </div>
          <div className="legend-item">
            <span className="legend-dot dot-pending"></span>
            <span>Pendientes: <strong>{chartData.total - chartData.completed}</strong></span>
          </div>
        </div>
      </div>

      {/* Gráfico 2: Distribución por Categoría */}
      <div className="chart-card">
        <div className="chart-header">
          <BarChart3 size={18} className="text-purple" />
          <h4>Distribución por Categorías</h4>
        </div>

        <div className="category-bars-list">
          {chartData.categories.map((cat) => (
            <div key={cat.name} className="cat-bar-item">
              <div className="cat-bar-label">
                <span>{cat.name}</span>
                <span className="cat-bar-count">{cat.count} ({cat.percentage}%)</span>
              </div>
              <div className="cat-progress-track">
                <div
                  className="cat-progress-fill"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico 3: Matriz de Prioridades */}
      <div className="chart-card">
        <div className="chart-header">
          <Layers size={18} className="text-emerald" />
          <h4>Balance de Prioridades</h4>
        </div>

        <div className="priority-summary-list">
          <div className="priority-metric-row">
            <div className="priority-tag high">Alta</div>
            <div className="priority-track">
              <div
                className="priority-fill high"
                style={{
                  width: `${chartData.total ? (chartData.priorities.alta / chartData.total) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="priority-num">{chartData.priorities.alta}</span>
          </div>

          <div className="priority-metric-row">
            <div className="priority-tag medium">Media</div>
            <div className="priority-track">
              <div
                className="priority-fill medium"
                style={{
                  width: `${chartData.total ? (chartData.priorities.media / chartData.total) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="priority-num">{chartData.priorities.media}</span>
          </div>

          <div className="priority-metric-row">
            <div className="priority-tag low">Baja</div>
            <div className="priority-track">
              <div
                className="priority-fill low"
                style={{
                  width: `${chartData.total ? (chartData.priorities.baja / chartData.total) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="priority-num">{chartData.priorities.baja}</span>
          </div>
        </div>

        <div className="priority-note">
          <CheckCircle2 size={14} className="text-emerald" />
          <span>Calculado reactivamente con <code>useMemo</code></span>
        </div>
      </div>
    </div>
  )
}

export default TaskCharts
