import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <>
      <MenuItem title={"Home"} page={"/"} />
      <MenuItem title={"Events"} page={"/events"} />
      <MenuItem title={"User Login"} page={"/user-login"} />
      <MenuItem title={"User Signup"} page={"/user-signup"} />
      <MenuItem title={"Staff Login"} page={"/staff-login"} />
    </>
  );
}
