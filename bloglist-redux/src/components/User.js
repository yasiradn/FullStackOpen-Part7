import React from 'react'
import { Link
  } from "react-router-dom"
const User = ({users}) => {
    const ShowUserAndBlogs = () => {
        return(
            <div>
                <table>
                    <tr>
                        <td><Link to={`/user/${users.id}`}>{users.name}</Link></td>
                        <td>{users.blogs.length}</td>
                    </tr>
                </table>
            </div>
        )
    }
    return(
        <div>
           {ShowUserAndBlogs()}
        </div>
    )
}

export default User