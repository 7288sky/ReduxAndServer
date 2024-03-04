import { createSlice } from "@reduxjs/toolkit";

export const registerSlice=createSlice({
    name:"register",
    initialState:{
        fullName: '',
        email: '',
        password: '',
        userName:''        
    },
    reducers:{
        updateRegisterData: (state, action) => {
          // I stuck here (use return keyWord)
return {
  ...state,
  ...action.payload
}
            // console.log(action.payload)
            // console.log(state)
          }
    }
})


export const {updateRegisterData,increase}= registerSlice.actions
export default registerSlice.reducer;