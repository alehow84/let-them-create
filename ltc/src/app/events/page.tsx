"use client";

import Navbar from "@/components/navbar/Navbar";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getCraftEvents } from "@/lib/GoogleEventsApi";
import { useEffect, useState } from "react";

/*
-here i will make a call to the serpApi and will render all events
-The component will also check for events the staff user has created and will render those if available

*/

export default function Page() {
  const [loading, isLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [events, setEvents] = useState<any>(null);
  console.log(events, "<<events");

  useEffect(() => {
    const events = getCraftEvents();
    setEvents(events);
  }, []);
  /*
  -the use effect will listen for a change to a state called userQuery, which will be updated when the user types in the search bar.
  - userQuery state might be a global context as the NavBar is available across several routes
  */

  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main className="h-dvh">
        <EventCard />
      </main>
      <Footer />
    </>
  );
}
