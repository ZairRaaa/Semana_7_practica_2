# GUÍA PRÁCTICA SEMANA 07 – 2° PARTE
**Asignatura:** Desarrollo de Aplicaciones Web (IS093A)  
**Tema:** React Hooks: useState, useEffect, useContext, useRef, useReducer, useCallback, useMemo y Hooks Personalizados  

## Objetivo de la Práctica
Desarrollar un **Dashboard de Gestión con Estado Complejo** que cumpla:
1. `useReducer` para estado de lista (add, remove, filter, sort) + `useState` para UI local.
2. `useContext` para tema claro/oscuro o preferencias de usuario.
3. `useEffect` para sincronizar preferencias con `localStorage` y cleanup.
4. `useMemo` para lista filtrada/ordenada, `useCallback` para handlers de botones.
5. `useRef` para auto-focus en input o acceso a nodo DOM sin re-render.
6. Hook personalizado `useLocalStorage` o `useDebounce` reutilizable.

---

## Roles Técnicos
- **Arquitecto de Estado:** `useReducer`, acciones, función reducer, inmutabilidad.
- **Ingeniero de Efectos & Contexto:** `useEffect`, `useContext`, sincronización con almacenamiento, limpieza (cleanup).
- **Optimizador de Rendimiento:** `useMemo`, `useCallback`, `useRef`, análisis Profiler.
- **QA & Hook Validator:** Reglas de Hooks, ESLint warnings, documentación técnica, custom hook.

---

## Estructura de Entregables
### Entregable 1: Repositorio GitHub
- `package.json`, `src/`, `README.md`
- `README.md` debe incluir:
  - Diagrama de flujo de estado y ciclo de render.
  - Justificación técnica de cada hook utilizado (¿por qué no useState simple?).

### Entregable 2: Validación Final
1. Ejecutar `npm run dev` y verificar cero warnings de `react-hooks/exhaustive-deps` en ESLint.
2. React DevTools Profiler: grabar interacción, identificar componentes re-renderizados y validar optimizaciones.
3. Verificar que `useEffect` tenga cleanup activo.
4. Evidencias y explicaciones de cada validación con capturas de pantalla.

---

## Estructura de Archivos Base Solicitada
1. `src/contexts/ThemeContext.jsx`: Contexto para tema claro/oscuro con persistencia en localStorage y cleanup.
2. `src/hooks/useTasksReducer.js`: Reducer con tipos de acción (ADD, REMOVE, TOGGLE, FILTER, SORT) e inmutabilidad.
3. `src/hooks/useLocalStorage.js`: Custom hook para sincronizar estado con `localStorage`.
4. `src/components/TaskList.jsx`: Lista de tareas optimizada con `useMemo`, `useCallback` y `useRef`.
5. `src/App.jsx`: Componente principal que integra el Dashboard, Provider, formularios y controles.
