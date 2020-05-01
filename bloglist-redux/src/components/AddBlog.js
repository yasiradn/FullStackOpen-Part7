import React, {useState} from 'react'
import {addNewBlog} from '../reducers/blogResucers'
import {useDispatch} from 'react-redux'

const AddNewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthour] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogCreate = (e) => {
    e.preventDefault()
    console.log(`Passing Data ${title} ${author} ${url}`)
    try {
      const newObj = { title,author,url }
      dispatch(addNewBlog(newObj))
      setTitle('')
      setAuthour('')
      setUrl('')
    } catch (error) {
      console.log('error: Adding a blog',error)
    }
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
          <div>
          title <input id="title" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>
          author <input id="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthour(target.value)}/>
          </div>
          <div>
          url <input id="url" type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)}/>
          </div>
        </div>
        <button id="submit-btn" type="submit">create</button>
      </form>
    </div>
  )
}

export default AddNewBlog