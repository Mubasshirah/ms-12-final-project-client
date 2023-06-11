
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import axios from 'axios';
export const AuthContext=createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider=new GoogleAuthProvider();
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log("current user", currentUser);
            
            // get and set jwt token
            if(currentUser){
                axios.post('http://localhost:5000/jwt',{email:currentUser.email})
                .then(data=>{
                    console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token);
                    setLoading(false);
                })
            }
            
            else{
                localStorage.removeItem('access-token')
            }
            
           
        });
        return ()=>{
            return unsubscribe();
        }

    },[])

    const createUser=(email,password)=>{
        setLoading(true);
return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

   const updateUserPofile=(name,photo)=>{
    return updateProfile(auth.currentUser,{
        displayName:name,photoURL:photo
    });
   } 
const logOut=()=>{
    setLoading(true);
    return signOut(auth);
}
const googleSignIn=()=>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
}
    const authInfo={
        user,
        loading,
        createUser,
        signIn,
         logOut,
         updateUserPofile,
         googleSignIn
         

    }
    return (
        <AuthContext.Provider value={authInfo}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;