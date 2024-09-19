import Image from "next/image";
import Logo from "../../../public/icons/Let them create Branding and planning.png";
import { Playpen_Sans } from "next/font/google";
import Typing from "../Typing";

const Playpen = Playpen_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

export default function HomepageTop() {
  return (
    <div className="bg-gradient-to-r from-blue to-neutral h-dvh flex flex-col">
      <main className="md:flex items-center md:mt-10">
        <div className="md:ml-20">
          <Image
            src={Logo}
            alt="Let Them Create"
            height={550}
            width={550}
            priority
          />
        </div>
        <div className="text-center items-end md:ml-16 hover:cursor-default">
          <div className={Playpen.className}>
            <Typing text="Inspire, Create, Connect." />
          </div>
        </div>
      </main>
    </div>
  );
}
