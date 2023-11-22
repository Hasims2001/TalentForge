import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from 'redux-thunk';
import { reducer as Jobseeker } from "./JobseekerReducer/reducer";
import { reducer as Recruiter } from "./RecruiterReducer/reducer";
import {reducer as Auth} from "./AuthReducer/reducer";
const rootReducer = combineReducers({
    Jobseeker,
    Recruiter,
    Auth
})
const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export default store;