import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  const baseUrl = "http://localhost:5000";

  const createUser = async (email, password, name, photo, userRole = "buyer") => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      await updateProfile(newUser, { displayName: name, photoURL: photo });

      const userData = {
        email: newUser.email,
        name,
        photoURL: photo,
        role: userRole,
      };

      await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      return newUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const userData = {
        email: googleUser.email,
        name: googleUser.displayName,
        photoURL: googleUser.photoURL,
        role: "buyer",
      };

      await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      return googleUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const response = await fetch(`${baseUrl}/users/${currentUser.email}`);
          
          if (response.ok) {
            const data = await response.json();
            setRole(data?.role || "buyer");
          } else {
            setRole("buyer");
          }
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole("buyer");
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [baseUrl]);

  const authInfo = {
    user,
    role,
    loading,
    setLoading, 
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;