import HomeButtonLogo from "../HomeButtonLogo";
import Searchbar from "./Searchbar";
import Link from "next/link";
import UserLinks from "./UserLinks";

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center w-screen bg-slate-light">
      <HomeButtonLogo size={100} />
      <Searchbar />
      <Link
        href="/events"
        className="text-white rounded-full hover:bg-sky hover:text-slate p-2 ml-4"
      >
        Browse events
      </Link>
      <div className="ml-auto mr-4">
        <UserLinks />
      </div>
    </nav>
  );
}
