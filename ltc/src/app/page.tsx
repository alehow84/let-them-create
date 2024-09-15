import Navbar from "./components/navbar/Navbar";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import HomepageTop from "./components/homepage/HomepageTop";
import HomepageBottom from "./components/homepage/HomepageBottom";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <BurgerMenu />
      <HomepageTop />
      <HomepageBottom />
      <Footer />
    </>
  );
}
