import Image from "next/image";
import staffLogin from "../../../public/bg-images/staffLogin.jpg";
import HomeButtonLogo from "../components/HomeButtonLogo";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen grid overflow-hidden grid-cols-1 md:grid-cols-2">
      <div className="hidden lg:block">
        <Image src={staffLogin} alt="photo of a two artists working together" />
      </div>
      <div className="grid grid-cols-1 h-screen">
        <div className="col-auto relative">
          <div className="absolute top-0 right-0 m-4">
            <HomeButtonLogo size={100} />
          </div>
        </div>
        <div className="col-auto">
          <form className="flex flex-col justify-center mx-auto space-y-8">
            <h1 className="text-center text-3xl text-slate py-6">
              Staff Login
            </h1>
            <input
              type="text"
              id="email-address"
              placeholder="Email address"
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            <input
              type="text"
              id="password"
              placeholder="Password"
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            <button
              type="submit"
              className="py-4 px-10 max-w-sm mx-auto text-white bg-orange shadow-md rounded-xl hover:bg-amber  hover:text-blue transition ease-in-out duration-200"
            >
              Submit
            </button>
            <div className="mx-auto text-lg text-blue hover:text-slate ">
              <Link href="/user-login">User login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
