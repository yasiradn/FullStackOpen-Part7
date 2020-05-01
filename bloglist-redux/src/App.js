    import React,{useState} from 'react'
    import Login from './components/Login'
    import Blog from './components/Blog'
    import User from './components/User'
    import UserDetail from './components/UserDetail'
    import BlogDetail from './components/BlogDetail'
    import AddNewBlog from './components/AddBlog'
    import { useSelector, useDispatch} from 'react-redux'
    import {fetchAllBlogs} from './reducers/blogResucers'
    import {fetchUsers} from './reducers/userReducers'
    import {
        BrowserRouter as Router,
        Switch, Route, Link
      } from "react-router-dom"

    const App = () => {
        const [shouldShow, setShouldShow] = useState(true)
        const dispatch = useDispatch()
        const isUser = useSelector(state=>state.login)
        dispatch(fetchAllBlogs())
        const blog_posts = useSelector(state=>state.blog_data)
        dispatch(fetchUsers())
        const getUsers = useSelector(state=>state.users)
        const Menu = () => {
            const padding = {
              paddingRight: 5,
            }
            return (
              <div>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              {isUser.name} logged in <button id="logout" onClick={()=>window.localStorage.removeItem('BlogAppUser')}> logout </button>
            </div>
            )
          }
        const AddBlog = () => {
            return(
                <div>
                <AddNewBlog/>
                <button onClick={() => setShouldShow(true)}>cancel</button>
                </div>
            )
        }
        const UserList = () => {
            return(
                <div>
                    <h3>Users</h3>
                    <tr>
                        <th> Blog Created </th>
                    </tr>
                    {getUsers.map(user => <User key = {user.id} users={user}/>)}
                </div>
            )
        }
        const AddBlogCntrl = shouldShow ? <button id="createBlog-btn" onClick={() => setShouldShow(false)}> new blog </button> : <div>{AddBlog()}</div>
        const ShowBlog = () => {
            return(
                <div>
                    <Router>
                    <Menu/>
                        <Switch>
                            <Route path="/users"><UserList/></Route>
                            <Route path="/users/:id"><UserDetail users={getUsers}/></Route>
                            <Route path="/blogs/:id"><BlogDetail blog={blog_posts}/></Route>
                            <Route path="/"> {AddBlogCntrl} { blog_posts.map(blog => <Blog key = {blog.id} blog={blog}/>)} </Route>
                        </Switch>
                    </Router>
                </div>
            )
        }
        const show = isUser === null ? <Login/>: ShowBlog()
        return(
            <div>
            {show}
            </div>
        )
    }
    export default App