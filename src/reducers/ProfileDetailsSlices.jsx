import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    profilImage: "",
    showSavedData: false,
}

const profileDetailsSlice = createSlice({
    name: 'profileDetails',
    initialState,
    reducers: {
        setFirstName: (state, action) =>
        {
            state.firstName = action.payload
        },
        setLastName: (state, action) => 
        {
            state.lastName = action.payload
        },
        setEmail: (state, action) => 
        {
            state.email = action.payload
        },
        setProfilImage: (state, action) => 
        {
            state.profilImage = action.payload
        },
        setShowSavedData: (state, action) => 
        {
            state.showSavedData = action.payload
        }
    }
})

export const {
    setFirstName,
    setLastName,
    setEmail,
    setProfilImage,
    setShowSavedData,
} = profileDetailsSlice.actions

export default profileDetailsSlice.reducer