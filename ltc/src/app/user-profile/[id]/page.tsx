"use client";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import { useState } from "react";

interface UserProfileProps {
  params: {
    id: string;
  };
}

//will need to update this interface when I add projects to a user
interface currentUser {
  uid: string;
  email: string;
  displayName: string | null;
  documentId: string;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id: string };
//   console.log("ID:", id);
//   try {
//     // Get user data from Firestore
//     const userDoc = doc(db, "users", `${id}`);
//     const docSnap = await getDoc(userDoc);

//     if (docSnap.exists()) {
//       return {
//         props: {
//           currentUser: docSnap.data,
//         },
//       };
//     } else {
//       return {
//         notFound: true,
//       };
//     }
//   } catch (error) {
//     //create an error state and set to then be rendered if there's an error
//     console.error("Error fetching user data:", error);
//     return {
//       notFound: true,
//     };
//   }
// };

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = params;
  console.log(id, "<<id");
  const [errorMsg, setErrorMsg] = useState<any>(null);

  try {
    const userDoc = doc(db, "users", `${id}`);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const user = docSnap.data() as currentUser;
      return (
        <>
          <ProtectedRoute>
            <Navbar />
            <BurgerMenu />
            <main className="h-dvh">
              <h1>{`User Profile`}</h1>
              {/* {user && user.uid === uid && (
                <div>
                  <p>Email: {user.email}</p>
                  <p>UID: {user.uid}</p>
                </div>
              )} */}
            </main>
            <Footer />
          </ProtectedRoute>
        </>
      );
    } else {
      return <div className="text-red-600">User not found</div>;
    }
  } catch (error: any) {
    //update state to contain error
    setErrorMsg(error.message);
    return <div>{errorMsg}</div>;
  }
}
