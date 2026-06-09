import { createContext, useContext, useEffect, useState } from "react";
import { 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth} from '../firebase/config'


const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    function logout(){
        return signOut(auth)
    }
    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setLoading(false)

        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)
// error msg :Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

    
 