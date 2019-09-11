import React, {useReducer} from 'react';
import createDataContext from './createDataContext';




// our reducer to conrol blog posts (add, edit, delete)
const blogReducer = (state, action)=> {  // state = the array of blogposts
    switch(action.type) {
        case 'delete_blogpost':
            return state.filter( blogPost => blogPost.id !== action.payload );
        case 'add_blogpost': 
            return [...state, { id: Math.floor(Math.random() * 99999), title: `Blog Post #${state.length + 1}` }];
        default: 
            return state;
    }

}; 


 const addBlogPost = (dispatch) =>{ 
    return ()=>{
        dispatch({type: 'add_blogpost'})
    };
}



const deleteBlogPost = (dispatch) =>{ 
    return (id)=>{
        dispatch({ type: 'delete_blogpost', payload: id})
    };
}

export const {Context, Provider} = createDataContext(blogReducer , {addBlogPost, deleteBlogPost}, []);



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

