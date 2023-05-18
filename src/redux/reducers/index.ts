// import { combineReducers } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import appearance from './appearance';
import auth from './auth';

export { auth };
export default combineReducers({
  appearance,
  auth,
});
