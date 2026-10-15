export const TASK_ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_SEARCH: 'SET_SEARCH',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  SET_TASKS: 'SET_TASKS',
  RESET_MOCK_DATA: 'RESET_MOCK_DATA',
  GENERATE_BATCH_TASKS: 'GENERATE_BATCH_TASKS',
}

// Lista rica de tareas iniciales de ejemplo
export const initialTasksState = {
  items: [
    {
      id: '1',
      title: 'Comprender el ciclo de render y hooks de React',
      category: 'Estudio',
      priority: 'alta',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
    {
      id: '2',
      title: 'Implementar useReducer para gestión de estado complejo',
      category: 'Desarrollo',
      priority: 'alta',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    },
    {
      id: '3',
      title: 'Construir hook reutilizable useLocalStorage con sync bidireccional',
      category: 'Desarrollo',
      priority: 'media',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: '4',
      title: 'Diseñar interfaz moderna con tema claro/oscuro y Tailwind-free CSS',
      category: 'Diseño',
      priority: 'media',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    },
    {
      id: '5',
      title: 'Validar optimizaciones y reducción de commits con React Profiler',
      category: 'QA',
      priority: 'alta',
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: '6',
      title: 'Auditar limpieza de efectos (cleanup) para evitar fugas de memoria',
      category: 'QA',
      priority: 'alta',
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: '7',
      title: 'Elaborar diagrama de arquitectura de estado y renderizado',
      category: 'Estudio',
      priority: 'baja',
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: '8',
      title: 'Implementar gráficos estadísticos y distribución de categorías',
      category: 'Diseño',
      priority: 'media',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ],
  filter: 'all', // 'all' | 'pending' | 'completed'
  sort: 'asc',   // 'asc' | 'desc' | 'priority'
  searchQuery: '',
}

/**
 * Función Reducer pura que garantiza la inmutabilidad del estado
 */
export function tasksReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK: {
      if (!action.payload || !action.payload.title?.trim()) {
        return state
      }

      const newTask = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        title: action.payload.title.trim(),
        category: action.payload.category || 'General',
        priority: action.payload.priority || 'media',
        completed: false,
        createdAt: new Date().toISOString(),
      }

      return {
        ...state,
        items: [newTask, ...state.items],
      }
    }

    case TASK_ACTIONS.REMOVE_TASK: {
      return {
        ...state,
        items: state.items.filter((task) => task.id !== action.payload),
      }
    }

    case TASK_ACTIONS.TOGGLE_TASK: {
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }
    }

    case TASK_ACTIONS.SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      }
    }

    case TASK_ACTIONS.SET_SORT: {
      return {
        ...state,
        sort: action.payload,
      }
    }

    case TASK_ACTIONS.SET_SEARCH: {
      return {
        ...state,
        searchQuery: action.payload,
      }
    }

    case TASK_ACTIONS.CLEAR_COMPLETED: {
      return {
        ...state,
        items: state.items.filter((task) => !task.completed),
      }
    }

    case TASK_ACTIONS.SET_TASKS: {
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : state.items,
      }
    }

    case TASK_ACTIONS.RESET_MOCK_DATA: {
      return {
        ...state,
        items: initialTasksState.items,
        filter: 'all',
        searchQuery: '',
      }
    }

    case TASK_ACTIONS.GENERATE_BATCH_TASKS: {
      const count = action.payload || 20
      const categories = ['Desarrollo', 'Diseño', 'Estudio', 'QA', 'General']
      const priorities = ['alta', 'media', 'baja']
      const batch = Array.from({ length: count }, (_, i) => ({
        id: `batch-${Date.now()}-${i}`,
        title: `Tarea de prueba masiva #${state.items.length + i + 1} para profiling`,
        category: categories[i % categories.length],
        priority: priorities[i % priorities.length],
        completed: i % 2 === 0,
        createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      }))

      return {
        ...state,
        items: [...batch, ...state.items],
      }
    }

    default:
      return state
  }
}

export default tasksReducer
