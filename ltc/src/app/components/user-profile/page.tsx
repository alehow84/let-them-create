import Navbar from "../navbar/Navbar";
import Footer from "../Footer";
import BurgerMenu from "../burgerMenu/BurgerMenu";

import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Page() {
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
