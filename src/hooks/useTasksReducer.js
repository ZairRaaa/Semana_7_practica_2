// Tipos de acción para el reducer
export const TASK_ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_SEARCH: 'SET_SEARCH',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  SET_TASKS: 'SET_TASKS',
}

// Estado inicial por defecto
export const initialTasksState = {
  items: [
    {
      id: '1',
      title: 'Comprender el ciclo de render y hooks de React',
      category: 'Estudio',
      priority: 'alta',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: '2',
      title: 'Implementar useReducer para estado complejo',
      category: 'Desarrollo',
      priority: 'alta',
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: '3',
      title: 'Validar optimizaciones con React Profiler',
      category: 'QA',
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

    default:
      return state
  }
}

export default tasksReducer
