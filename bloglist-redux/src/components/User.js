import React from 'react'
import {
    useParams, BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"
import {fetchUsers} from '../reducers/userReducers'
import { useDispatch,useSelector } from 'react-redux'
import user from '../services/user'
const User = () => {
    const disptach = useDispatch()
    disptach(fetchUsers())
    const getUsers = useSelector(state=>state.users)
    if (!getUsers) {
        return null
      }
    const ShowUserAndBlogs = () => {
        return(
            <div>
                <h3>Users</h3>
                <table>
                    <thead>
                        <th>blogs created</th>
                    </thead>
                        {getUsers.map(user => 
                            <div key={user.id}>
                                <tbody> 
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                    <td>{user.blogs.length}</td>
                                </tbody>
                            </div>
                        )} 
                </table>
            </div>
        )
    }
    const UserInfo = () => {
           console.log('username')
            const id = useParams().id
            const user = getUsers.find(item => item.id === id)
            console.log('username', user)
            if(!user){
                return null
            }
            return (
              <div>
               <h2>{user.name}</h2>
               <h3>Added Blogs</h3>
               {user.blogs.map(blog=><div>
                   <li>{blog.title}</li>
               </div>)}
              </div>
            )
    }
    return(
        <div>
            <br/>
            <Router>
                <Switch>
                <Route path ="/users/:id"><UserInfo/></Route>
                <Route path ="/"><ShowUserAndBlogs/></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default User