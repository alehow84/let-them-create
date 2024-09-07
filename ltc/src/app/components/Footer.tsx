import Link from "next/link";
import Image from "next/image";
import Insta from "../../../public/icons/instagram.svg";
import TikTok from "../../../public/icons/tiktok.svg";

export default function Footer() {
  return (
    <footer className="flex items-center w-screen bg-slate-light p-6">
      <Link
        href="https://www.instagram.com/"
        className="scale-100 hover:scale-125 mr-8"
      >
        <Image src={Insta} height={40} width={40} alt="instagram" />
      </Link>
      <Link
        href="https://www.instagram.com/"
        className="scale-100 hover:scale-125 mr-4"
      >
        <Image src={TikTok} height={40} width={40} alt="instagram" />
      </Link>
      <Link
        href="/staff-login"
        className="text-white rounded-full hover:scale-125 ml-auto"
      >
        Staff Login
      </Link>
    </footer>
  );
}
