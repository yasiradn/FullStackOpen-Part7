import React,{useState}from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch} from 'react-redux'
import {fetchAllBlogs,updateLike,deleteBlog} from '../reducers/blogResucers'
import AddNewBlog from '../components/AddBlog'
import User from '../components/User'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
const Blog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthour] = useState('')
  const [url, setUrl] = useState('')
  const [shouldShow, setShouldShow] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  dispatch(fetchAllBlogs())
  const blog_posts = useSelector(state=>state.blog_data)
  console.log(blog_posts)
  const handleBlogCreate = async(e) => {
    e.preventDefault()
    console.log(`Passing Data ${title} ${author} ${url}`)
    try {
      const newObj = { title,author,url }
      await blogService.postAll(newObj)
      setTitle('')
      setAuthour('')
      setUrl('')
    } catch (error) {
      console.log('error: Adding a blog',error)
    }
  }
const addNewBlog = () => {
    return(
      <div>
        <AddNewBlog
          handleBlogCreate={handleBlogCreate}
          title={title}
          author={author}
          url={url}
          handlesetTitle={({ target }) => setTitle(target.value)}
          handlesetAuthor={({ target }) => setAuthour(target.value)}
          handlesetUrl={({ target }) => setUrl(target.value)}
        />
        <button onClick={() => setShouldShow(true)}>cancel</button>
      </div>
    )
  }
  const isShowAddBlog = shouldShow ? <button id="createBlog-btn" onClick={() => setShouldShow(false)}> new blog </button> : <div>{addNewBlog()}</div>

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

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.removeItem('BlogAppUser')
    window.localStorage.clear()
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
  const BlogDetailView = ({blog}) => {
    return(
      <div id= "detailedView">
          <div style={blogStyle}>
             <p id="title">{blog.title}</p>
             <p id="url">{blog.url}</p>
             <p id="like">likes {blog.likes} <button id="like-btn" onClick={()=>likeBlog(blog)}>likes</button></p>
             <p id="author">{blog.author}</p>
             <button id="delete-btn" onClick={()=>removeBlog(blog)}>remove</button>
          </div>
      </div>
    )
  }
    const BlogNormalView = ({blog}) => {
    return(
      <div id="normalView">
          <div style={blogStyle}>
            <div>{blog.title} {blog.author}</div>
          </div>
      </div>
    )
  }
  const user_data = useSelector(state=>state.login)
  const normalView = blog_posts.map(blog => <BlogDetailView key={blog.id} blog={blog}/>)
  return (
    <div className={'blog'}>
       <div>
       <h2>blogs</h2>
       <p> {user_data.username} Logged in</p>
       <button onClick={()=>handleLogout()}>logout</button>
       </div>
      <Router>
      <Switch>
        <Route path="/users">
          <User />
        </Route>
        <Route path="/">
        {isShowAddBlog}
        {normalView}
        </Route>
      </Switch>
      </Router>
    </div>
  )

}
export default Blog
