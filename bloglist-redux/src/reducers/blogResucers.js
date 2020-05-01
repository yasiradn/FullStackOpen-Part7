import blogService from '../services/blogs'
const blogReducers = (state=[],action) => { 
   switch (action.type) {
       case 'GET_DATA':
           return action.data.sort((a, b) => b.likes - a.likes)
        case 'UPDATE_LIKE':
            console.log('Update', action.data)
           return state.map(post=> post.id === action.data.id? action.data:post).sort((a, b) => b.likes - a.likes)
        case 'DELETE_BLOG':
            console.log('delete', action.data)
           return state.filter(post=> post.id =! action.data.id)
        case 'ADD_BLOG':
           return [...state, action.data]
       default:
           return state;
   }
}

export const fetchAllBlogs =  () => {
    return async dispatch => {
        const result = await blogService.getAll()
        dispatch({
            type: 'GET_DATA',
            data:result
        })
    }
}

export const updateLike =  (updateObject) => {
    return async dispatch => {
        await blogService.updateAll(updateObject)
        dispatch({
            type: 'UPDATE_LIKE',
            data:updateObject
        })
    }
}

export const deleteBlog =  (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog.id)
        dispatch({
            type: 'DELETE_BLOG',
            data:blog
        })
    }
}

export const addNewBlog =  (blog) => {
    return async dispatch => {
        await blogService.postAll(blog)
        dispatch({
            type: 'ADD_BLOG',
            data:blog
        })
    }
}


export default blogReducers