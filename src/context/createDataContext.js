import React, {useReducer} from 'react';


// reducer = the func with the switch case, actions = the helper function who calls dispatch, init = the type var we want to change
export default (reducer, actions, initialState)=> { 
    const Context = React.createContext();


    const Provider = ({ children })=>{
        const [state, dispatch] = useReducer(reducer,initialState);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }


        return <Context.Provider value={{state, ...boundActions}}>
                {children}
              </Context.Provider>
    }

return {Context, Provider};
};
