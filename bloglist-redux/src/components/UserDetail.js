import React from 'react'
import { useParams } from "react-router-dom"

const UserDetail = ({users}) => {
    console.log("user detail",users)
     const id = useParams().id
     const user = users.find(item => item.id === id)
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

export default UserDetail