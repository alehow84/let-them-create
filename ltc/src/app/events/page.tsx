//add metadata to this page
import Navbar from "../components/navbar/Navbar";
import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

export default function Page() {
  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main className="h-dvh">
        <EventCard />
      </main>
      <Footer />
    </>
  );
}
