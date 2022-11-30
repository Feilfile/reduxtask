import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import userDataReducer from '../features/userData/userDataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    userData: userDataReducer,
  },
});
