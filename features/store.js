import { configureStore,combineReducers,applyMiddleware } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import thunk from 'redux-thunk';               

const rootReducer = combineReducers({
    auth: authReducer
})
export const store = configureStore({
  reducer: rootReducer
});

