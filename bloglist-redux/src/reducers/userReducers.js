import userService from '../services/user'

const userReducers = (state=[],action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
        return action.data
    default:
        return state;
}
}

export const fetchUsers = () => {
    return async dispatch => {
      const user = await userService.getAllUsers()
      dispatch({
          type:'GET_ALL_USERS',
          data: user
        })
    }
  }

  export const LoggedIn = (userobject) => {
    return dispatch => {
      dispatch({
          type:'LOGGED_IN',
          data: userobject
        })
    }
  }  
  
  export default userReducers