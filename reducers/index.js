import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import user from './user';

const reducers = {
    // ... other reducers ...
    user,
    toastr: toastrReducer // <- Mounted at toastr.
  }

export default combineReducers(reducers);
