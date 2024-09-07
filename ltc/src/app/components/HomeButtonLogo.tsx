import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/icons/HomeButtonLogo.svg";

export default function HomeButtonLogo({ size }: { size: number }) {
  return (
    <Link href="/">
      <Image src={Logo} alt="Home" width={size} height={size} />
    </Link>
  );
}
