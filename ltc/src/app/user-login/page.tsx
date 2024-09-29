"use client";

import Image from "next/image";
import userLoginPic from "../../../public/bg-images/userLogin.jpg";
import HomeButtonLogo from "../../components/HomeButtonLogo";
import SubmitButton from "@/components/static/SubmitButton";
import Link from "next/link";
import { useState } from "react";
import { LoginType } from "../../types/AuthTypes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

//User Login page
export default function Page() {
  const [userCred, setUserCred] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<any>(null);

  const { logIn } = useAuth();
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setUserCred({ ...userCred, email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setUserCred({ ...userCred, password: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await logIn(userCred.email, userCred.password);
      router.push(`/events`);
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="h-screen grid overflow-hidden grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <Image
          src={userLoginPic}
          alt="photo of a message saying JOIN US spelled out in scrabble letters"
        />
      </div>
      <div className="grid grid-cols-1 h-screen">
        <div className="col-auto relative">
          <div className="absolute top-0 right-0 m-4">
            <HomeButtonLogo size={100} />
          </div>
        </div>
        <div className="col-auto">
          <form
            action=""
            onSubmit={handleLogin}
            className="flex flex-col justify-center mx-auto space-y-8"
          >
            <h1 className="text-center text-3xl text-slate py-6">Log in</h1>
            <input
              type="text"
              id="email-address"
              name="email-address"
              placeholder="Email address"
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
              onChange={handleEmailChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
              onChange={handlePasswordChange}
            />
            {loginError ? (
              <div className="text-center text-xs text-red-600 mx-auto border-0 w-1/2">
                There was a problem logging in: {loginError}
              </div>
            ) : (
              <></>
            )}
            <SubmitButton text="Login" />
            <div className="mx-auto text-lg text-blue hover:text-slate">
              <Link href="/user-signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
