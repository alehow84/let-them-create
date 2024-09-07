import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import Logo from "../../public/icons/Let them create Branding and planning.png";
import Typing from "@/static/Typing";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-grow">
        <div>
          <Image src={Logo} alt="Let Them Create" height={500} width={500} />
        </div>
        <div className="mx-auto">
          <Typing />
        </div>
      </main>
      <Footer />
    </div>
  );
}
