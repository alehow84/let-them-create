import Navbar from "../navbar/Navbar";
import Footer from "../Footer";
import BurgerMenu from "../burgerMenu/BurgerMenu";

import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

// export async function getServerSideProps(context) {
//   const { userId } = context.params;

//   // Fetch user data from Firebase - make sure to replace fetchUserDataFromFirebase(userId) with actual data fetching logic.
//   const userData = await fetchUserDataFromFirebase(userId);

//   return {
//     props: {
//       userData,
//     },
//   };
// }

//make sure to add {userDara} as a param in UserProfile, then you can render by accessing certain info off the userData object.
export default function UserProfile() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main className="h-dvh">
        <h1>User Profile</h1>
      </main>
      <Footer />
    </>
  );
}
