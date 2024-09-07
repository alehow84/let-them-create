import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/icons/HomeButtonLogo.svg";

export default function HomeButtonLogo({ size }: { size: number }) {
  return (
    <Link href="/" className="hover:scale-110">
      <Image src={Logo} alt="Home" width={size} height={size} />
    </Link>
  );
}
