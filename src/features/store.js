import { configureStore,combineReducers,applyMiddleware } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import geoReducer from './geoFenceSlice'
              

const rootReducer = combineReducers({
  auth: authReducer,
  geo: geoReducer
})
export const store = configureStore({
  reducer: rootReducer
});

