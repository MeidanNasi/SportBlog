import React, {useReducer} from 'react';
import createDataContext from './createDataContext';




// our reducer to conrol blog posts (add, edit, delete)
const blogReducer = (state, action)=> {  // state = the array of blogposts
    switch(action.type) {
        case 'add_blogpost': 
            return [...state, { title: `Blog Post #${state.length + 1}` }];
        default: 
            return state;
    }

}; 
 const addBlogPost = (dispatch) =>{ 
    return ()=>{dispatch({type: 'add_blogpost'})}}
 export const {Context, Provider } = createDataContext(blogReducer , {addBlogPost}, []);



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

