import React from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import { useSelector} from 'react-redux'

const App = () => {
    const isUser = useSelector(state=>state.login)
    const show = isUser === null ? <Login/>: <Blog/>
    return(
        <div>
           {show}
        </div>
    )
}
export default App