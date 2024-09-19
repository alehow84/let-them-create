import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";

export default function Custom404() {
  return (
    <>
      <Navbar />
      <BurgerMenu />
      <div className="h-svh flex flex-col justify-center">
        <h1 className="mx-auto text-2xl">404 - Page Not Found</h1>
      </div>
      <Footer />
    </>
  );
}
