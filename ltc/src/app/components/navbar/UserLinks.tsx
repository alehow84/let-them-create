import Link from "next/link";

/*
This component will use global context -  if a user is logged in, the users name and a person icon will be rendered. If not logged in, will be rendered as below
*/

export default function UserLinks() {
  return (
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
  );
}
