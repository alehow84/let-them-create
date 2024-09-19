import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import { Event } from "../../../types/EventTypes";

interface UserProfileProps {
  params: {
    id: string;
  };
}

interface currentUser {
  uid: string;
  email: string;
  displayName: string | null;
  events: Event[] | [];
  documentId: string;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = params;
  console.log(id, "<<id");

  try {
    //This part is not working due to insufficient permissions
    //Look up userDoc with id param which is the docRef.id
    const userDoc = doc(db, "users", `${id}`);
    //get a snapshot of the doument
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const user = docSnap.data() as currentUser;
      return (
        <>
          <ProtectedRoute>
            <Navbar />
            <BurgerMenu />
            <main className="h-dvh flex flex-col">
              <div>
                <h1>My Events</h1>
              </div>
              <div>{user.email}</div>
            </main>
            <Footer />
          </ProtectedRoute>
        </>
      );
    } else {
      return <div className="text-red-600">User not found</div>;
    }
  } catch (error: any) {
    return (
      <>
        <Navbar />
        <BurgerMenu />
        <div className="h-dvh flex items-center">
          <div className="mx-auto text-xl text-center">
            Something went wrong: {error.message}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
