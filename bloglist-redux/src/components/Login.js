import React, { useState, useEffect} from 'react'
import loginService from '../services/login'
import {LoggedIn} from '../reducers/loginReducer'
import { useDispatch} from 'react-redux'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    const getLoggedUser = window.localStorage.getItem('BlogAppUser')
    if(getLoggedUser){
      const user = JSON.parse(getLoggedUser)
      dispatch(LoggedIn(user))
    }
  },[])
  const handleLogin = async(e) => {
    e.preventDefault()
    console.log(`Loggin using ${username} ${password}`)
    try {
      const user = await loginService.login({
        username, password
      })//TODO: Dispatch to Login
      window.localStorage.setItem('BlogAppUser', JSON.stringify(user))
      dispatch(LoggedIn(user))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }
    return(
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
            username <input id="username" type="text"  name="Username" onChange={({target})=>setUsername(target.value)}/>
            </div>
            <div>
            password <input id="password" type="password" name="Password" onChange={({target})=>setPassword(target.value)}/>
            </div>
            <button id="login-btn" type="submit">login</button>
          </form>
        </div>
      )
}

export default Login