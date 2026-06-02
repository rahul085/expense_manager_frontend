import {jwtDecode} from 'jwt-decode'
import { useReducer } from 'react';

export const AuthReducer=(state,{type,payload})=>{
    switch(type){
        case "LOGIN":{

            const rawToken=payload;

            const decodedData= jwtDecode(rawToken);
            console.log("DECODED TOKEN:", decodedData);

            const username=decodedData.sub;
            localStorage.setItem('user',username);
            localStorage.setItem('token',rawToken);

            return {
                user: username,
                token: rawToken
                


            };

        }
            
        case "LOGOUT":
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return{
                user: null,
                token: null

            }
        default:
            return state;
    }
}