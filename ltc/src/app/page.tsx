import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import Logo from "../../public/icons/Let them create Branding and planning.png";
import Typing from "./components/Typing";
import { Playpen_Sans } from "next/font/google";
import AboutUs from "@/static/AboutUs";

const Playpen = Playpen_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue to-neutral h-screen">
        <div className="min-h-screen flex flex-col ">
          <Navbar />
          <main className="flex flex-grow items-center mt-10">
            <div className="ml-20">
              <Image
                src={Logo}
                alt="Let Them Create"
                height={550}
                width={550}
              />
            </div>
            <div className="ml-16 hover:cursor-default">
              <div className={Playpen.className}>
                <Typing text="Inspire, Create, Connect." />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue to-neutral h-screen">
        <div className="min-h-screen flex justify-center items-center">
          <section className="flex justify-center items-center">
            <div className={Playpen.className}>
              <Typing text="A bit about us." />
            </div>
            <div className="w-1/2">
              <AboutUs />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
