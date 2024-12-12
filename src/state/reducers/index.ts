import { combineReducers } from 'redux';
import usereducer from './usereducer'

const rootReducer = combineReducers({
  user: usereducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

