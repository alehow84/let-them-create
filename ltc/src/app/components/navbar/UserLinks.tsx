import Link from "next/link";

export default function UserLinks() {
  return (
    <>
      <Link
        href="/user-login"
        className="text-white rounded-full hover:bg-sky hover:text-slate p-2 ml-4"
      >
        Login
      </Link>
      <Link
        href="/user-signup"
        className="text-white rounded-full hover:bg-sky hover:text-slate p-2 ml-4"
      >
        Signup
      </Link>
    </>
  );
}
