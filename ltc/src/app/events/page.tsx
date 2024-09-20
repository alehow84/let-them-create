"use client";

import Navbar from "@/components/navbar/Navbar";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import eventsJson from "../events.json";

/*
-here i will make a call to the serpApi and will render all events
-The component will also check for events the staff user has created and will render those if available

*/

export default function Page() {
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [events, setEvents] = useState<any>(null);

  useEffect(() => {
    //comment back in when submitting project
    // fetch("/api/events")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setEvents(data);
    //     setIsLoading(false);
    //     console.log(events, "<<events");
    //   }).catch((error) => setError(error));

    //comment the below 2 lines out when submitting project
    setEvents(eventsJson);
    setIsLoading(false);
  }, [isloading]);

  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main className="h-auto min-h-dvh container mx-auto flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-8 justify-center items-center">
          {events && !isloading ? (
            events.map((event: any) => <EventCard thisEvent={event} />)
          ) : (
            <div className="">
              <div className="mx-auto text-xl text-center">
                Loading events ...
              </div>
            </div>
          )}
          {error ? (
            <div className="">
              <div className="mx-auto text-xl text-center">
                Sorry, we're having problems! Please refresh or try again later.
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
