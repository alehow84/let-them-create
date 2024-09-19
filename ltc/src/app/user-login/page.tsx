"use client";

import Image from "next/image";
import userLoginPic from "../../../public/bg-images/userLogin.jpg";
import HomeButtonLogo from "../components/HomeButtonLogo";
import Link from "next/link";
import { useState } from "react";
import { LoginType } from "../types/AuthTypes";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

/*
? useState to create data using LoginType from AuthTypes as type inference
- use logIn method from Authcontext
- import router from next/navigation
- create async handleLogin function that will
1)prevent default
2)try - await the outcome of logIn
3)??possibly in a nested try catch block, then route to user-profile page
*/

export default function Page() {
  const [userData, setUserData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<any>(null);

  const { logIn } = useAuth();
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      //login user - this works
      const userCredentials = await logIn(userData.email, userData.password);
      const user = userCredentials.user;
      try {
        //look up user in collection using their user uid - this works
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        // if their is a userDoc, get the docRef id and use this to navigate to user-profile - this works
        if (userDoc) {
          const docId = userDoc.data().documentId;
          router.push(`/user-profile/${docId}`);
        }
      } catch (error: any) {
        setLoginError(error.message);
        console.log(error.message, "<<error2");
      }
    } catch (error: any) {
      setLoginError(error.message);
      console.log(error.message, "<<error1");
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
            <button
              type="submit"
              className="py-4 px-10 max-w-sm mx-auto text-white bg-orange shadow-md rounded-xl hover:bg-amber  hover:text-blue transition ease-in-out duration-200"
            >
              Submit
            </button>
            <div className="mx-auto text-lg text-blue hover:text-slate">
              <Link href="/user-signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
