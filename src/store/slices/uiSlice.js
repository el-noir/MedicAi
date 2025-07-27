import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  theme: "dark",
  sidebarOpen: false,
  notifications: [],
  loading: {
    global: false,
    prediction: false,
    profile: false,
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload
      state.loading[key] = value
    },
  },
})

export const { setTheme, toggleSidebar, setSidebarOpen, addNotification, removeNotification, setLoading } =
  uiSlice.actions

export default uiSlice.reducer
