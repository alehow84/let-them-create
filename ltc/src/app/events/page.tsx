"use client";

import Navbar from "@/components/navbar/Navbar";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [events, setEvents] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch events from google api
        const apiResponse = await fetch("/api/events");
        const apiEvents = await apiResponse.json();

        //fetch events from firestore database
        const staffDocId = process.env.NEXT_PUBLIC_STAFF_DOCREF as string;
        const staffDocRef = doc(db, "staff", staffDocId);
        const staffDocSnap = await getDoc(staffDocRef);
        if (staffDocSnap.exists()) {
          const firestoreEvents = staffDocSnap.data().events;
          setEvents([...apiEvents, ...firestoreEvents]);
          setIsLoading(false);
        } else {
          setEvents(apiEvents);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <BurgerMenu />
      <main
        className={`h-auto min-h-dvh container mx-auto ${
          isLoading || error ? "flex items-center justify-center" : ""
        }`}
      >
        <div className="grid grid-cols-1 w-10/12 md:w-11/12 md:mx-auto md:grid-cols-4 md:auto-rows-fr gap-6 mt-8 mb-8 justify-center items-center">
          {events && !isLoading
            ? events.map((event: any, index: number) => (
                <EventCard thisEvent={event} eventState={events} key={index} />
              ))
            : null}
          {isLoading ? (
            // <div className="mx-auto">
            <div className="mx-auto text-xl text-center">
              Loading events ...
            </div>
          ) : // </div>
          null}
          {error ? (
            <div className="mx-auto text-xl text-center">
              <p>
                Sorry, we are having problems! Please refresh or try again
                later.
              </p>
              <p>Error: {error.message}</p>
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
