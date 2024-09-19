/*
-I think I will be able to reuse this element for 
1.events list page
2. user profile
3. staff profile
 and will have to include all buttons, and use state to determine 
 a. what page is showing and therefore
 b. what buttons are rendered.
 - Look at BurgerMenu for inspiration
*/
import Image from "next/image";
import TestImg from "../../public/bg-images/pexels-freestocks-251274.jpg";

export default function EventCard() {
  return (
    <div className="bg-white rounded-xl m-4 p-3 w-fit text-slate shadow-xl">
      <div className="flex flex-col">
        <Image
          src={TestImg}
          alt="test image"
          width={250}
          height={120}
          style={{ borderRadius: "8px", marginBottom: "8px" }}
        />

        <h2 className="text-xl">Event Title</h2>
        <div className="flex">
          <ul className="text-slate-light">
            <li>Event date: </li>
            <li>Event location: </li>
            <li>Event Host:</li>
          </ul>
          <button className="text-white rounded-lg bg-orange pr-2 pl-2 hover:bg-sky hover:text-slate transition duration-150 ease-in-out ml-5">
            More info
          </button>
        </div>
      </div>
    </div>
  );
}
