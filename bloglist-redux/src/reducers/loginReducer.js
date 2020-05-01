import blogService from '../services/blogs'
const loginReducer = (state=null,action) => {
  switch (action.type) {
    case 'LoggedIn':
        blogService.setToken(action.data.token)
        return action.data
    default:
        return state;
  }
}

export const LoggedIn = (user) => {
  return dispatch => {
    dispatch({
        type:'LoggedIn',
        data: user
      })
  }
}


export default loginReducer