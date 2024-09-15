import Navbar from "../navbar/Navbar";
import Footer from "../Footer";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import { GlobalStateProvider } from "../../contexts/GlobalStateContext";

export default function Page() {
  return (
    <>
      <GlobalStateProvider>
        <Navbar />
        <BurgerMenu />
        <main className="h-dvh">
          <h1>User Profile</h1>
        </main>
        <Footer />
      </GlobalStateProvider>
    </>
  );
}
