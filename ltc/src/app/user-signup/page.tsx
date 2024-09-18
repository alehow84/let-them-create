"use client";

import Image from "next/image";
import HomeButtonLogo from "../components/HomeButtonLogo";
import Link from "next/link";
import userSignUpPic from "../../../public/bg-images/userSignup.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { collection, addDoc, updateDoc } from "firebase/firestore";

export default function Page() {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordErrorBool, setPasswordErrorBool] = useState<boolean>(false);

  const [signUpError, setSignUpError] = useState<any>(null);

  const { signUp } = useAuth();
  const router = useRouter();
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/gm;

  useEffect(() => {
    console.log("Rendered");
  }, [passwordErrorBool]);

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

      try {
        const email = e.target.elements.namedItem("email-address").value;
        const password = password1;
        const userCredentials = await signUp(email, password);
        const user = userCredentials.user;

        //2nd try/catch block dependent on outcome of successful signup - send new user details to firebase collection
        //This is working, user being created in db
        try {
          const docRef = await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || null,
            events: [],
          });
          //update doc with its own documentRefId to pass to the page it is directed to, this is working
          await updateDoc(docRef, { documentId: docRef.id });
          router.push(`/user-profile/${docRef.id}`);
        } catch (error: any) {
          setSignUpError(`Error creating user: ${error.message}`);
        }
      } catch (error: any) {
        setPasswordErrorBool(false);
        setSignUpError(`Error authenticating user: ${error.message}`);
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
              name="email-address"
              placeholder="Email address"
              required
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            <input
              type="password"
              id="password1"
              name="password1"
              placeholder="Password"
              required
              onChange={handlePassword1Change}
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-black"
            />
            <input
              type="password"
              id="password2"
              name="password2"
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
