import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    links: [],
    selectedOption: 'github',
    holderPopUp: '',
    showPopupForm: false,
    showLinks: false,
    platforms: {},
}

const socialLinksSlice = createSlice({
  name: 'socialLinks',
  initialState,
  reducers: {
    setLinks: (state, action) => {
        state.links = action.payload
    },
    setSelectedOption: (state, action) => {
        state.selectedOption = action.payload
    }, 
    setHolderPopUp: (state,action) =>{
        state.holderPopUp = action.payload
  },
  setShowPopupForm: (state, action) => {
    state.showPopupForm = action.payload
  },
  setPlatforms: (state, action) => {
    state.platforms = action.payload
  },
  addLink: (state, action) => {
    state.links.push(action.payload)
  },
  setShowLinks: (state, action) => 
        {
            state.showLinks = action.payload
        },
  // Add a new action to remove a link
  removeLink: (state, action) => {
    const linkToRemove = action.payload;
    state.links = state.links.filter(link => link.platform !== linkToRemove.platform);
  },
}})

export const {
    setLinks,
    setSelectedOption,
    setHolderPopUp,
    setShowPopupForm,
    setPlatforms,
    setShowLinks,
    addLink,
    removeLink,
  } = socialLinksSlice.actions;

  export default socialLinksSlice.reducer;