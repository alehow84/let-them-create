import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import Logo from "../../public/icons/Let them create Branding and planning.png";
import Typing from "@/static/Typing";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue to-neutral h-screen">
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <main className="flex flex-grow items-center">
          <div className="ml-20">
            <Image src={Logo} alt="Let Them Create" height={550} width={550} />
          </div>
          <div className="ml-20">
            <Typing />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
