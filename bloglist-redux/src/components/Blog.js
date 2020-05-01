import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteBlog} from '../reducers/blogResucers'
import {Link} from "react-router-dom"
const Blog = ({blog}) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

function removeBlog(blog){
    try{
      const isDel = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if(isDel){
        dispatch(deleteBlog(blog))
      }
    }catch(err){
      console.log(err)
    }
  }
    const BlogNormalView = () => {
    return(
      <div id="normalView">
          <div style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
      </div>
    )
  }
  return (
    <div className={'blog'}>
      <BlogNormalView/>
    </div>
  )

}
export default Blog
