"use client";

//add metadata to this page
import Image from "next/image";
import HomeButtonLogo from "../components/HomeButtonLogo";
import Link from "next/link";
import userSignUpPic from "../../../public/bg-images/userSignup.jpg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Page() {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordErrorBool, setPasswordErrorBool] = useState<boolean>(false);

  useEffect(() => {
    //Will I have to fetch the user data from the data base here and the redirect to userProfile page?
    //Will there need to be a state for profileCreated that when true, the useEffect redirects to the user profile page?
    console.log("passwordErrorBool changed:", passwordErrorBool);
  }, [passwordErrorBool]);

  //store password and password retype to check they match
  const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
    console.log(e.target.value, "<<password1");
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
    console.log(e.target.value, "<<password2");
  };

  //check passwords match on submission of form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password1 === password2) {
      //proceed with form submission
      //-make a variable called password that password1 becomes
      //-make a variable called email that email-address becomes
    } else {
      //if passwords do not match, show error message
      // setPasswordMatchBool to false
      setPasswordErrorBool(true);
      console.log(passwordErrorBool);
    }
  };

  /*
-Create a password based account
- 

*/

  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed up
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });

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
            onSubmit={handleSubmit}
            className="flex flex-col justify-center mx-auto space-y-8"
          >
            <h1 className="text-center text-2xl md:text-3xl text-slate pt-10 md:py-6">
              Create an account
            </h1>
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
              <div className="text-red-600 mx-auto border-0">
                Passwords don't match! Please try again...
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
