import { Search, Filter, ArrowUpDown, Trash } from 'lucide-react'

export const TaskFilterControls = ({
  filter,
  sort,
  searchQuery,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onClearCompleted,
  totalCompleted,
}) => {
  return (
    <div className="filter-controls-container">
      {/* Buscador de tareas */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar tareas por título..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-actions-row">
        {/* Filtros de estado */}
        <div className="filter-buttons-group">
          <span className="filter-group-label">
            <Filter size={14} /> Filtro:
          </span>
          <button
            type="button"
            className={`pill-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            Todas
          </button>
          <button
            type="button"
            className={`pill-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => onFilterChange('pending')}
          >
            Pendientes
          </button>
          <button
            type="button"
            className={`pill-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completadas
          </button>
        </div>

        {/* Ordenamiento */}
        <div className="sort-group">
          <label htmlFor="sort-select" className="sort-label">
            <ArrowUpDown size={14} /> Orden:
          </label>
          <select
            id="sort-select"
            className="select-field-sm"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="asc">Más recientes primero</option>
            <option value="desc">Más antiguas primero</option>
            <option value="priority">Mayor prioridad</option>
          </select>
        </div>

        {/* Limpiar completadas */}
        {totalCompleted > 0 && (
          <button
            type="button"
            className="btn-outline-danger"
            onClick={onClearCompleted}
            title="Eliminar todas las tareas completadas"
          >
            <Trash size={14} />
            Limpiar completadas ({totalCompleted})
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskFilterControls
