/*
- add metadata 
- add image for user log in (free img)
- make image fit screen
- create a form for user login 
*/
import Image from "next/image";
import userLoginPic from "../../../public/pexels-sheinshine-3127880.jpg";

export default function Page() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-between">
      <Image
        src={userLoginPic}
        alt="photo of a message saying JOIN US spelled out in scrabble letters"
      />
    </main>
  );
}
