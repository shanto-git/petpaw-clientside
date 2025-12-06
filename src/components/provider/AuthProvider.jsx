import React, { createContext, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [loading, setLoading]= useState(true);

    const creatUser = 
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;