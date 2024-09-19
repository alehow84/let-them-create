import Typing from "../Typing";
import { Playpen_Sans } from "next/font/google";
import AboutUs from "../static/AboutUs";

const Playpen = Playpen_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

export default function HomepageBottom() {
  return (
    <div className="bg-gradient-to-r from-blue to-neutral h-dvh flex justify-center items-center">
      <section className="md:flex justify-center items-center">
        <div className="ml-5 md:mr-20 hover:cursor-default">
          <div className={Playpen.className} style={{ width: "350px" }}>
            <Typing text="A bit about us." />
          </div>
        </div>
        <div className="m-6 md:ml-10 md:w-1/2">
          <AboutUs />
        </div>
      </section>
    </div>
  );
}
