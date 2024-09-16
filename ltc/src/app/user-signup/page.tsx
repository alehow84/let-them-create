"use client";

import Image from "next/image";
import HomeButtonLogo from "../components/HomeButtonLogo";
import Link from "next/link";
import userSignUpPic from "../../../public/bg-images/userSignup.jpg";
import { useState, useEffect } from "react";

// import { RegistrationType } from "../types/AuthTypes";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [passwordErrorBool, setPasswordErrorBool] = useState<boolean>(false);
  // const [data, setData] = useState<RegistrationType>({
  //   email: "",
  //   password: "",
  // });
  const [signUpError, setSignUpError] = useState<any>(null);

  const { signUp, loading } = useAuth();
  const router = useRouter();
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/gm;

  useEffect(() => {
    console.log("Rendered");
  }, [passwordErrorBool]);

  //store password and password retype to check they match
  const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    if (password1 === password2 && regex.test(password1)) {
      setPasswordErrorBool(false);
      setUserCreated(true);

      try {
        const email = e.target.elements.namedItem("email-address").value;
        const password = password1;
        //this might not be required
        // setData({
        //   email,
        //   password,
        // });
        const userCredentials = await signUp(email, password);
        const uid = userCredentials.user.uid;
        console.log(`Navigating to /user-profile/${uid}`);
        //setup firebase storage in firebase
        //push user data to db firestorage
        router.push(`/user-profile/${uid}`);
      } catch (error: any) {
        setPasswordErrorBool(false);
        setSignUpError(error.message);
      }
    } else {
      setPasswordErrorBool(true);
    }
  };

  return (
    <div className="h-screen grid overflow-hidden grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <Image
          src={userSignUpPic}
          alt="A message saying JOIN US spelled out in scrabble letters"
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
            onSubmit={handleRegistration}
            className="flex flex-col justify-center mx-auto space-y-8"
          >
            <h1 className="text-center text-2xl md:text-3xl text-slate pt-10 md:py-6">
              Create an account
            </h1>
            <div className="md:w-1/2 text-center mx-auto text-xs text-blue m-3">
              Password criteria: must have a minimum length of 10 characters,
              contain at least 1 lowercase letter, uppercase letter, number and
              special character.
            </div>
            <input
              type="text"
              id="email-address"
              placeholder="Email address"
              required
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            <input
              type="password"
              id="password1"
              placeholder="Password"
              required
              onChange={handlePassword1Change}
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            <input
              type="password"
              id="password2"
              placeholder="Re-type your Password"
              required
              onChange={handlePassword2Change}
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            {passwordErrorBool ? (
              <div className="text-center text-xs text-red-600 mx-auto border-0 md:w-1/2">
                Please check your password matches & meets minimum security
                criteria
              </div>
            ) : (
              <></>
            )}
            {signUpError ? (
              <div className="text-center text-xs text-red-600 mx-auto border-0 md:w-1/2">
                {signUpError}
              </div>
            ) : (
              <></>
            )}
            {userCreated ? (
              <div className="text-green-800 mx-auto border-0">Success!</div>
            ) : (
              <></>
            )}
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
