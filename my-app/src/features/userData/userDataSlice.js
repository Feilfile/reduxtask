import { createSlice } from '@reduxjs/toolkit'

const noUser = {
    id: null,
    username: null,
    password: null,
    forename: null,
    surname: null
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        value: noUser
    },
    reducers: {
        setUserData: (state, action) => {
            return{
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                forename: action.payload.forename,
                surname: action.payload.surname,
            }
        },

        clearUserData: state => {
            return{
                //change to state = noUser
                ...state,
                id: null,
                username:null,
                password: null,
                forename: null,
                surname: null,
            }
        }
    }
})

export const {setUserData, clearUserData} = userDataSlice.actions

export default userDataSlice.reducer