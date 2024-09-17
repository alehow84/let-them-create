import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, collection, query, where } from "firebase/firestore";

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

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = params;
  console.log(id, "<<id");

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
            <main className="h-dvh flex flex-col">
              <div>
                <h1>My Events</h1>
              </div>
              <div>{user.email}</div>
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

    return (
      <>
        <Navbar />
        <BurgerMenu />
        <div className="h-dvh flex items-center">
          <div className="mx-auto">Something went wrong: {error.message}</div>
        </div>
        <Footer />
      </>
    );
  }
}
