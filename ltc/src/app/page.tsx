import Navbar from "./components/navbar/Navbar";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import HomepageTop from "./components/homepage/HomepageTop";
import HomepageBottom from "./components/homepage/HomepageBottom";
import Footer from "./components/Footer";
import { GlobalStateProvider } from "./contexts/GlobalStateContext";

export default function App() {
  return (
    <GlobalStateProvider>
      <Navbar />
      <BurgerMenu />
      <HomepageTop />
      <HomepageBottom />
      <Footer />
    </GlobalStateProvider>
  );
}
