"use client";

import MenuItem from "./MenuItem";
import LogOut from "./Logout";
import { useAuth } from "@/contexts/AuthContext";

export default function Menu() {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 auto-rows-fr">
      <MenuItem title={"Home"} page={"/"} />
      {user.uid ? (
        user.email === process.env.NEXT_PUBLIC_STAFF_EMAIL ? (
          <>
            <MenuItem title="Staff Home" page={"/staff-home"} />
            <LogOut />
          </>
        ) : (
          <>
            <MenuItem title="User Home" page={"/events"} />
            <LogOut />
          </>
        )
      ) : (
        <>
          <MenuItem title={"Events"} page={"/events"} />
          <MenuItem title={"User Login"} page={"/user-login"} />
          <MenuItem title={"User Signup"} page={"/user-signup"} />
          <MenuItem title={"Staff Login"} page={"/staff-login"} />
        </>
      )}
    </div>
  );
}
