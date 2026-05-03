// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"

// export const microsoftLogin = createAsyncThunk(
//     "auth/microsoftLogin",
//     async (accessToken, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 "http://20.112.251.4/api/auth/login/",
//                 { access_token: accessToken }
//             )
//             return response.data   
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Login failed"
//             )
//         }
//     }
// )

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         user: null,
//         token: null,
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         logout(state) {
//             state.user = null
//             state.token = null
//             state.error = null
//             localStorage.removeItem("authToken")
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(microsoftLogin.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(microsoftLogin.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.token = action.payload.token   // adjust key to match API
//                 state.user = action.payload.user     // adjust key to match API
//                 localStorage.setItem("authToken", action.payload.token)
//                 localStorage.setItem("authUser", JSON.stringify(action.payload.user))  
//             })
            
//             .addCase(microsoftLogin.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//     },
// })

// export const { logout } = authSlice.actions
// export default authSlice.reducer


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"

// export const microsoftLogin = createAsyncThunk(
//     "auth/microsoftLogin",
//     async (accessToken, { rejectWithValue }) => {
//         try {
//             console.log("📤 Hitting login API with token:", accessToken) 
//             const response = await axios.post(
//                 "http://20.112.251.4/api/auth/login/",
//                 { access_token: accessToken }
//             )
//             console.log("📥 Login API response:", response.data) 
//             return response.data
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Login failed"
//             )
//         }
//     }
// )

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         user: null,
//         token: null,
      
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         logout(state) {
//             state.user = null
//             state.token = null
//             state.refreshToken = null
//             state.error = null
//             // ✅ clear everything
//             localStorage.removeItem("authToken")
//             localStorage.removeItem("refreshToken")
//             localStorage.removeItem("authUser")
//         },
//         // ✅ added — update token after refresh
//         setToken(state, action) {
//             state.token = action.payload
//             localStorage.setItem("authToken", action.payload)
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(microsoftLogin.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(microsoftLogin.fulfilled, (state, action) => {
//                 state.loading = false

//                 // ✅ API returns 'token' not 'access'
//                 state.token = action.payload.token
//                 state.user = action.payload.user

//                 // ✅ store correctly
//                 localStorage.setItem("authToken", action.payload.token)
//                 localStorage.setItem("authUser", JSON.stringify(action.payload.user))
//             })
//             .addCase(microsoftLogin.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 console.log("❌ Login rejected:", action.payload)
//             })
//     },
// })

// export const { logout, setToken } = authSlice.actions
// export default authSlice.reducer


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://20.112.251.4/api"

export const microsoftLogin = createAsyncThunk(
    "auth/microsoftLogin",
    async (accessToken, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/login/`,
                { access_token: accessToken }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            )
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            state.error = null
            localStorage.removeItem("authToken")
            localStorage.removeItem("authUser")
        },
        setToken(state, action) {
            state.token = action.payload
            localStorage.setItem("authToken", action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(microsoftLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(microsoftLogin.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.token
                state.user = action.payload.user
                localStorage.setItem("authToken", action.payload.token)
                localStorage.setItem("authUser", JSON.stringify(action.payload.user))
            })
            .addCase(microsoftLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout, setToken } = authSlice.actions
export default authSlice.reducer