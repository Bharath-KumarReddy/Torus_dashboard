import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
// import thunk from 'redux-thunk';
// import { Middleware } from 'redux';

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(thunk)),
});
