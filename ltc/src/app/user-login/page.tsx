/*
- add metadata 
- add image for user log in (free img)
- make image fit screen
- create a form for user login 
- add logo home button component
*/
import Image from "next/image";
import userLoginPic from "../../../public/userLogin.jpg";

export default function Page() {
  return (
    <div className="max-h-screen flex mx-auto">
      <div className="max-w-[650px]">
        <Image
          src={userLoginPic}
          alt="photo of a message saying JOIN US spelled out in scrabble letters"
        />
      </div>

      <form className="flex flex-col justify-center mx-auto space-y-8">
        <h1 className="text-center text-3xl text-blue py-6">Log in</h1>
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
          className="py-4 px-10 max-w-sm mx-auto text-white bg-orange shadow-md rounded-xl hover:bg-amber  hover:text-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
