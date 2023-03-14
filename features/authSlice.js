import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const initialState = {
    isAuthenticated: false
  };

// login user
// export const login = createAsyncThunk('user/auth', async (data,thunkAPI) => {
//     try
//     {
        

//         return '';
//     }
//     catch (error)
//     {
//         const message = "Please check your email & password !";
//         return message;

//     }
    
// });

// check user authenticated or not
export const isUserLogin = createAsyncThunk('user/isuser', async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            return true;
        }
        else {
            return false;
        }
    });
});

// slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated =true
        },
        loginFailed: (state) => {
            state.isAuthenticated =false
        },
        logout: (state) => {
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {

    //   builder.addCase(login.fulfilled, (state, action) => {
    //       state.isAuthenticated = true;
    //       state.errMessage = action.payload;
    //     //   console.log(action)
    //   });
    //     builder.addCase(login.rejected, (state, action) => {
    //         state.isAuthenticated = false;
    //         state.errMessage = action.payload;
    //   });
      builder.addCase(isUserLogin.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      });
    }
});

export const { loginSuccess,loginFailed, logout } = authSlice.actions
export default authSlice.reducer;