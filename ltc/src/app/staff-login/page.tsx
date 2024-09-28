"use client";
import Image from "next/image";
import staffLogin from "../../../public/bg-images/staffLogin.jpg";
import HomeButtonLogo from "../../components/HomeButtonLogo";
import SubmitButton from "@/components/static/SubmitButton";
import Link from "next/link";
import { useState } from "react";
import { LoginType } from "../../types/AuthTypes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

//Staff Login page
export default function Page() {
  const [staffCred, setStaffCred] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [staffLoginError, setStaffLoginError] = useState<any>(null);

  const { logIn, updateUserDocumentId } = useAuth();
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setStaffCred({ ...staffCred, email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setStaffCred({ ...staffCred, password: e.target.value });
  };

  const handleStaffLogin = async (e: any) => {
    e.preventDefault();
    try {
      const staffCredentials = await logIn(staffCred.email, staffCred.password);
      const staffUser = staffCredentials.user;
      try {
        const staffCollection = collection(db, "staff");
        const q = query(staffCollection, where("uid", "==", staffUser.uid));
        const querySnapshot = await getDocs(q);
        const staffDoc = querySnapshot.docs[0];
        if (staffDoc) {
          console.log("there is a staff doc");
          const docId = staffDoc.data().documentId;
          updateUserDocumentId(docId);
          router.push("/staff-home");
        } else {
          alert("No Matching staff user document found");
        }
      } catch (error: any) {
        setStaffLoginError(error.message);
      }
    } catch (error: any) {
      setStaffLoginError(error.message);
    }
  };

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
          <form
            action=""
            onSubmit={handleStaffLogin}
            className="flex flex-col justify-center mx-auto space-y-8"
          >
            <h1 className="text-center text-3xl text-slate py-6">
              Staff Login
            </h1>
            <input
              type="text"
              id="email-address"
              placeholder="Email address"
              onChange={handleEmailChange}
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-slate"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              className="py-4 px-10 max-w-sm mx-auto bg-white rounded-xl shadow-md shadow-slate"
            />
            {staffLoginError ? (
              <div className="text-center text-xs text-red-600 mx-auto border-0 w-1/2">
                There was a problem logging in: {staffLoginError}
              </div>
            ) : (
              <></>
            )}
            <SubmitButton text="Login" />
            <div className="mx-auto text-lg text-blue hover:text-slate ">
              <Link href="/user-login">User login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
