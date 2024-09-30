"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { logOut } = useAuth();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        logOut();
        router.push("/");
      }}
      className="bg-slate bg-opacity-75 hover:bg-sky text-white hover:text-slate rounded p-3 ml-1.5 mr-1.5 mt-5 mb-5 transition duration-150 ease-in-out"
    >
      Log out
    </div>
  );
}
