"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

interface UserType {
  email: string | null;
  uid: string | null;
  documentId?: string | null;
}

const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        //first check if the user is staff
        if (user.email === process.env.NEXT_PUBLIC_STAFF_EMAIL) {
          const staffCollection = collection(db, "staff");
          const q = query(staffCollection, where("uid", "==", user.uid));
          const staffQuerySnapshot = await getDocs(q);
          if (!staffQuerySnapshot.empty) {
            const staffDoc = staffQuerySnapshot.docs[0];
            setUser({
              email: user.email,
              uid: user.uid,
              documentId: staffDoc.id,
            });
          }
        } else {
          //look for users doc in user collection to access stored documentId to pass to user State accessible to app via AuthContext
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUser({
              email: user.email,
              uid: user.uid,
              documentId: userDoc.id,
            });
          } else {
            alert("No Matching user document found");
          }
        }
      } else {
        setUser({ email: null, uid: null, documentId: null });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Update the user to include the users firebase document reference
  const updateUserDocumentId = (documentId: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      documentId,
    }));
  };

  // Login the user
  const logIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null, documentId: null });
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, loading, updateUserDocumentId }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
