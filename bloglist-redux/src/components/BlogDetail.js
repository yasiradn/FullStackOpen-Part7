import React from 'react'
import { useParams } from "react-router-dom"
import {updateLike} from '../reducers/blogResucers'
import { useDispatch } from 'react-redux'

const BlogDetail = ({blog}) => {
    console.log('Blog Detail', blog)
    const dispatch = useDispatch()
    const id = useParams().id
     const blog_detail = blog.find(item => item.id === id)
     console.log('Blog Detail', blog_detail)
     if(!blog_detail){
         return null
     }
     function likeBlog(blog){
        let likes = blog.likes + 1
        console.log(likes)
        const updateObj = {
          likes: likes,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          id:blog.id
        }
          console.log(updateObj)
          dispatch(updateLike(updateObj))
      }
     return(
         <div>
             <h1>{blog_detail.title}</h1>
             <br/>
             <div>
                 {blog_detail.url}
                 <p id="like"> {blog_detail.likes} likes <button id="like-btn" onClick={()=>likeBlog(blog_detail)}>likes</button></p>
                 <p>added by {blog_detail.author}</p>
             </div>
         </div>
     )
}

export default BlogDetail