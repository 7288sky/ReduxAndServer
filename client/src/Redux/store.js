import {configureStore} from '@reduxjs/toolkit';
import registerReducer from './Register/registerSlice'
export const store= configureStore({
    reducer:{
        register:registerReducer
    },
});
