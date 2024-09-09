//add metadata to this page
import Navbar from "../components/navbar/Navbar";
import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import { GlobalStateProvider } from "../contexts/GlobalStateContext";

export default function Page() {
  return (
    <>
      <GlobalStateProvider>
        <Navbar />
        <BurgerMenu />
        <main className="h-dvh"></main>
        <Footer />
      </GlobalStateProvider>
    </>
  );
}
