import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import NewEventsForm from "@/components/NewEventsForm";

export default function Page() {
  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main className="h-auto min-h-dvh container mx-auto flex items-center">
        <NewEventsForm />
      </main>
      <Footer />
    </>
  );
}
