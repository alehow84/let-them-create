//add metadata to this page
import Navbar from "../components/navbar/Navbar";
import BurgerMenu from "../components/burgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

/*
-here i will make a call to the serpApi and will render all events
-The component will also check for events the staff user has created and will render those if available

*/

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
