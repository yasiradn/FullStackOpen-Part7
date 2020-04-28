import { combineReducers, createStore, applyMiddleware } from 'redux'
import loginReducer from './reducers/loginReducer'
import blogReducers from './reducers/blogResucers'
import userReducers from './reducers/userReducers'
import thunk from 'redux-thunk';
const reducers = combineReducers({
    login: loginReducer,
    blog_data: blogReducers,
    users: userReducers

})
const store = createStore(reducers, applyMiddleware(thunk))

export default store