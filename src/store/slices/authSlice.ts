import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  token: string | null
  user: {
    id: string
    email: string
    name: string
  } | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: sessionStorage.getItem("authToken") || null,
  user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")!) : null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthState["user"] }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      sessionStorage.setItem("authToken", action.payload.token)
      sessionStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      sessionStorage.removeItem("authToken")
      sessionStorage.removeItem("user")
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setCredentials, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer
