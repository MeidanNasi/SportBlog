import React, {useReducer} from 'react';
import createDataContext from './createDataContext';




// our reducer to conrol blog posts (add, edit, delete)
const blogReducer = (state, action)=> {  // state = the array of blogposts
    switch(action.type) {
        case 'delete_blogpost':
            return state.filter( blogPost => blogPost.id !== action.payload );
        case 'add_blogpost': 
            return [...state, { id: Math.floor(Math.random() * 99999),
                                title: action.payload.title , 
                                cotent: action.payload.content 
                              }
                                ];
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


 const addBlogPost = (dispatch) =>{ 
    return (title, content, callback)=>{
        dispatch({ type: 'add_blogpost' , payload: {title, content} });
        callback();
    };
}



const deleteBlogPost = (dispatch) =>{ 
    return (id)=>{
        dispatch({ type: 'delete_blogpost', payload: id})
    };
}



const editBlogPost = (dispatch) =>{ 
    return (id, title, content, callback)=>{
        dispatch({ type: 'edit_blogpost', payload: {id, title, content} });
        callback();
    };
}



export const {Context, Provider} = createDataContext(blogReducer , {addBlogPost, deleteBlogPost, editBlogPost}, 
                                                    [{title:"Test Post" , content:"Test Content" , id: 1 }]);



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

