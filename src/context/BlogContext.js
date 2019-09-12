import React, {useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';



// our reducer to conrol blog posts (add, edit, delete)
const blogReducer = (state, action)=> {  // state = the array of blogposts, action = the object we sent when we called dispatch 
    switch(action.type) {
        case 'get_blogposts':
            return action.payload; // payload = the list of blogpots we got from the server.
        case 'delete_blogpost':
            return state.filter( blogPost => blogPost.id !== action.payload );
        // case 'add_blogpost': 
        //     return [...state, { id: action.payload.id,
        //                         title: action.payload.title , 
        //                         cotent: action.payload.content 
        //                       }
        //                         ];
        case 'edit_blogpost': 
            return state.map((blogPost) =>{
             return blogPost.id === action.payload.id 
                ? action.payload
                :blogPost;
        })
        default: 
            return state;
    }

}; 


const getBlogPosts = dispatch =>{
return async ()=>{
    const response = await jsonServer.get('/blogposts'); // response.data === all the blog posts
    dispatch({  type: 'get_blogposts', payload: response.data  });
    };
};





 const addBlogPost = (dispatch) =>{ 
    return async (title, content, callback)=>{
        await jsonServer.post('/blogposts', {title, content});
        callback();
    };
};



const deleteBlogPost = (dispatch) =>{ 
    return async (id)=>{
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id});
    };
};



const editBlogPost = (dispatch) =>{ 
    return async (id, title, content, callback)=>{
        await jsonServer.put(`/blogposts/${id}`, {title,content});
        dispatch({ type: 'edit_blogpost', payload: {id, title, content} });
        callback();
    };
};



export const {Context, Provider} = createDataContext(blogReducer , {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts}, []);



 /*       after we built the abstact create data context we dont need this peace of code anymore 

 // const BlogContext = React.createContext();

export const BlogProvider = ( {children} ) => {
    const [blogPosts, dispatch] = useReducer(blogReducer, []);
    // helper function
    const addBlogPost = () =>{
        dispatch({type: 'add_blogpost'})  
    }
    return (
            <BlogContext.Provider value={{ data: blogPosts, addBlogPost}}>
            {children}
            </BlogContext.Provider>
    );
};
export default BlogContext;

*/

