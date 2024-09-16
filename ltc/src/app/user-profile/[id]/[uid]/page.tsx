import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/Footer";
import BurgerMenu from "../../../components/burgerMenu/BurgerMenu";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";

//import getAuth from firebase config?
import { auth } from "../../../../../firebaseConfig";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

// type CurrentUser = {
//   uid: string | null;
//   email: string | null;
//   emailVerified: boolean | null;
//   displayName: string | null;
//   photoUrl: string | null;
//   phoneNumber: string | null;
//   providerData: object | null;
// };

// export const getServerSideProps = (async () => {

//   //check authentication state, ensure user is authenticated before trying to access auth.currentUser
//   const currentUser = auth.currentUser;

//   //handle a null case

//   return { props: { currentUser } };
// }) satisfies GetServerSideProps<{ currentUser: CurrentUser }>;

//make sure to add {userData} as a param in UserProfile, then you can render by accessing certain info off the userData object.
export default function UserProfile() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const { uid } = router.query;
  console.log(user, "<<user");
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <BurgerMenu />
        <main className="h-dvh">
          <h1>{`User Profile`}</h1>
          {user && user.uid === uid && (
            <div>
              <p>Email: {user.email}</p>
              <p>UID: {user.uid}</p>
            </div>
          )}
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  );
}

/*
{
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>
*/
