"use client";
import Link from "next/link";
import Image from "next/image";
import UserIcon from "../../../public/icons/UserIcon.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function UserLinks() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  return (
    <>
      {user.uid ? (
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition ease-in-out duration-200">
              {user.email === process.env.NEXT_PUBLIC_STAFF_EMAIL ? (
                <Link href="/staff-profile">
                  <Image src={UserIcon} alt="Home" width={60} height={60} />
                </Link>
              ) : (
                <Link href={`/user-profile${user.documentId}`}>
                  <Image src={UserIcon} alt="Home" width={60} height={60} />
                </Link>
              )}
            </div>
            <p className="text-white text-xs">{user.email}</p>
          </div>
          <button
            className="text-white rounded-full hover:bg-sky hover:text-slate p-2 ml-4 transition ease-in-out duration-200"
            onClick={() => {
              logOut();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link
            href="/user-login"
            className="text-white rounded-full hover:bg-sky hover:text-slate p-2 ml-4 transition ease-in-out duration-200"
          >
            Login
          </Link>
          <Link
            href="/user-signup"
            className="text-white rounded-full hover:bg-sky hover:text-slate p-2 ml-4 transition ease-in-out duration-200"
          >
            Signup
          </Link>
        </>
      )}
    </>
  );
}
