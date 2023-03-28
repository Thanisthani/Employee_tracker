import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const initialState = {
    isAuthenticated: false,
    isLoading:false
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
    let isUser = false;
   await  onAuthStateChanged(auth, user => {
        if (user) {
            console.log('user on auth slice')
         isUser = true
          
        }
        else {
            console.log('authslice unauthorized')
            isUser = false
            
        }
   });
    
    return isUser;
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
        },
        loadingStart: (state) => {
            state.isLoading = true;
        },
        loadingStop: (state) => {
            state.isLoading = true;
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
            console.log(action.payload)
        state.isAuthenticated = action.payload;
      });
    }
});

export const { loginSuccess,loginFailed, logout,loadingStart,loadingStop } = authSlice.actions
export default authSlice.reducer;