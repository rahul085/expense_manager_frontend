import { createContext, useContext, useReducer } from "react";
import { AuthReducer } from "../reducers/AuthReducer";

const AuthContext=createContext();

const AuthProvider=({children})=>{
  

    const initialState={
        user:   localStorage.getItem('user') || null,
        token: localStorage.getItem('token') || null,
    }
   
    const [{user,token},authDispatch]=useReducer(AuthReducer,initialState);
    return(
        <AuthContext.Provider value={{user,token,authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
    
}

const useAuth=()=>useContext(AuthContext);
export {AuthProvider,useAuth};


