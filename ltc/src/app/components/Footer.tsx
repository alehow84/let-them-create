import Link from "next/link";
import Image from "next/image";
import Insta from "../../../public/icons/instagram.svg";
import TikTok from "../../../public/icons/tiktok.svg";
import Copyright from "../../../public/icons/copyright.svg";

export default function Footer() {
  return (
    <footer className="flex items-center w-screen bg-slate-light p-6">
      <div className="flex">
        <Link
          href="https://www.instagram.com/"
          className="scale-100 hover:scale-125 mr-8"
        >
          <Image src={Insta} height={40} width={40} alt="instagram" />
        </Link>
        <Link
          href="https://www.tiktok.com/en/"
          className="scale-100 hover:scale-125 mr-4"
        >
          <Image src={TikTok} height={40} width={40} alt="Tik Tok" />
        </Link>
      </div>
      <div className="flex text-white mx-auto">
        <Image src={Copyright} height={15} width={15} alt="copyright" />
        <strong className="text-sm hover:cursor-default hidden md:block">
          2024 Let Them Create
        </strong>
        <strong className="text-sm hover:cursor-default md:hidden ">
          2024 LTC
        </strong>
      </div>
      <div>
        <Link href="/staff-login">
          <p className="text-white rounded-full hover:scale-125 transition-transform">
            Staff Login
          </p>
        </Link>
      </div>
    </footer>
  );
}
