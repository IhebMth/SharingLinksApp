import { configureStore } from '@reduxjs/toolkit';
import socialLinksReducer from './reducers/SocialLinksSlices';
import ProfileDetailsReducer from './reducers/ProfileDetailsSlices';

 const store = configureStore({
  reducer: {
    socialLinks: socialLinksReducer,
    profileDetails: ProfileDetailsReducer
  },
});

export default store