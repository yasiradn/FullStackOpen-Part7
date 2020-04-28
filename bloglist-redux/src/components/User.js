import React from 'react'
import {fetchUsers} from '../reducers/userReducers'
import { useDispatch,useSelector } from 'react-redux'
const User = () => {
    const disptach = useDispatch()
    disptach(fetchUsers())
    const getUsers = useSelector(state=>state.users)
    console.log(getUsers)
    const ShowUserAndBlogs = () => {
        return(
            <div>
                <table>
                    <thead>
                        <th>blogs created</th>
                    </thead>
                        {getUsers.map(user => 
                            <div key={user.id}>
                                <tbody> 
                                    <td>{user.name}</td> 
                                    <td>{user.blogs.length}</td> 
                                </tbody>
                            </div>
                        )} 
                </table>
            </div>
        )
    }
    return(
        <div>
            <h3>Users</h3>
            <br/>
            <ShowUserAndBlogs/>
        </div>
    )
}

export default User