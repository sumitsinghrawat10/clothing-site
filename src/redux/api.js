// import axios from "axios"

// import { store } from './store'
// import { logout, setToken } from "./features/authSlice"





// //  single axios instance for whole app
// const api = axios.create({
//     baseURL: "http://20.112.251.4/api",
// })

// let isRefreshing = false
// let failedQueue = []

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (token) prom.resolve(token)
//         else prom.reject(error)
//     })
//     failedQueue = []
// }

// //  attach authToken to every request automatically
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("authToken")
//     console.log("Token", token)
//     if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`
//     }
//     return config
// })

// //  handle token expiry globally
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config
//         const is403 = error.response?.status === 403
//         const isExpired = error.response?.data?.detail === "Token has expired"

//         if (is403 && isExpired && !originalRequest._retry) {

//             // if already refreshing, queue this request
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject })
//                 })
//                     .then((token) => {
//                         originalRequest.headers["Authorization"] = `Bearer ${token}`
//                         return api(originalRequest)
//                     })
//                     .catch((err) => Promise.reject(err))
//             }

//             originalRequest._retry = true
//             isRefreshing = true

//             try {
//                 const refreshToken = localStorage.getItem("refreshToken")

//                 //  call refresh endpoint
//                 const res = await axios.post(
//                     "http://20.112.251.4/api/auth/token/refresh/",
//                     { refresh: refreshToken }
//                 )

//                 const newToken = res.data.access

//                 //  update token in redux + localStorage
//                 store.dispatch(setToken(newToken))

//                 // ✅ resolve all queued requests
//                 processQueue(null, newToken)

//                 // ✅ retry original request
//                 originalRequest.headers["Authorization"] = `Bearer ${newToken}`
//                 return api(originalRequest)

//             } catch (refreshError) {
//                 // ✅ refresh failed → logout
//                 processQueue(refreshError, null)
//                 store.dispatch(logout())
//                 window.location.href = "/"
//             } finally {
//                 isRefreshing = false
//             }
//         }

//         return Promise.reject(error)
//     }
// )

// export default api

import axios from "axios"
import { store } from './store'
import { logout } from "./features/authSlice"

const BASE_URL = "http://20.112.251.4/api"

// single axios instance for whole app
const api = axios.create({
    baseURL: BASE_URL,
})

// attach authToken to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))

// handle token expiry globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const is403 = error.response?.status === 403
        const isExpired = error.response?.data?.detail === "Token has expired"

        // no refresh token → just logout and redirect
        if (is403 && isExpired) {
            store.dispatch(logout())
            window.location.href = "/"
        }

        return Promise.reject(error)
    }
)

export default api