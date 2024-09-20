"use client";

import Navbar from "@/components/navbar/Navbar";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { get } from "http";

/*
-here i will make a call to the serpApi and will render all events
-The component will also check for events the staff user has created and will render those if available

*/

export default function Page() {
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [events, setEvents] = useState<any>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
        console.log(events, "<<events");
      });
  }, [isloading]);
  /*
  -the use effect will listen for a change to a state called userQuery, which will be updated when the user types in the search bar.
  - userQuery state might be a global context as the NavBar is available across several routes
  */

  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main className="h-dvh">
        {events ? (
          events.forEach((event: any) => <EventCard thisEvent={event} />)
        ) : (
          <div className="mx-auto text-xl items-center text-center">
            Loading events ...
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
