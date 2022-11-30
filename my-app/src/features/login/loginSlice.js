import { createSlice } from '@reduxjs/toolkit'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001"); 

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        errorMessage: null,
    },
    reducers: {


        rejected: state => {
            return{
                ...state,
                isLoggedIn: false,
                errorMessage: "Unauthorized",
            }
        },
        fullfilled: (state) => {
            return{
                ...state,
                isLoggedIn: true,
                errorMessage: "",
                }
        },
        logout: (state) => {
            return{
                ...state,
                isLoggedIn: false,
                errorMessage: "",
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { fullfilled, rejected, logout } = loginSlice.actions

export default loginSlice.reducer