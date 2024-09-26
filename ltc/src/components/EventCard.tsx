"use client";

import { format, parse, addMinutes } from "date-fns";
import Link from "next/link";
import EventCardButton from "./static/EventCardButton";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "../../firebaseConfig";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { Event } from "@/types/EventTypes";

export default function EventCard({
  thisEvent,
}: {
  thisEvent: any;
  eventState: any;
}) {
  const [currEvent, setCurrEvent] = useState<any>(null);
  const [eventRegBool, setEventRegBool] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (thisEvent) {
      setCurrEvent(thisEvent);
    }
  }, [thisEvent]);

  useEffect(() => {
    checkEventReg(user, thisEvent);
  }, [eventRegBool]);

  type EventDate = {
    start_date: string;
    when: string;
  };

  const checkEventReg = async (user: any, currentEvent: Event) => {
    try {
      const userDocRef = doc(db, "users", user.documentId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        userData.events.forEach((event: Event) => {
          if (
            event.title === currentEvent.title &&
            event.date.when === currentEvent.date.when &&
            event.venue.name === currentEvent.venue.name
          ) {
            setEventRegBool(true);
          }
        });
      }
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  };

  const handleRegisterClick = async (e: any) => {
    e.preventDefault();
    try {
      if (!user.uid) {
        alert("Please Sign up or Log in to register for an event");
      } else {
        const userDocRef = doc(db, "users", user.documentId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          if (!Array.isArray(userData?.events)) {
            await updateDoc(userDocRef, { events: [thisEvent] });
          } else {
            await updateDoc(userDocRef, { events: arrayUnion(thisEvent) });
          }
          setEventRegBool(true);
          alert("You have registered for this event");
        }
      }
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  };

  const formatDateInput = ({ eventDate }: { eventDate: EventDate }) => {
    //format the date for the purposes of enabling adding to calendar with loosely accurate date info. Uses the correct start date and time, but assumes event ends on the same day and is 1 hour long
    let eventStartDate = null;
    let startTimeMatch = null;
    let endTimeMatch = null;
    const startMonthMatch = eventDate.start_date?.match(/^[A-Za-z]+/);

    //handle making sure month abbrev is three chars long for parsing
    if (startMonthMatch && startMonthMatch[0].length > 3) {
      const truncEventStart = eventDate.start_date;
      const startDateBeg = truncEventStart.slice(0, 3);
      const startDateEnd = truncEventStart.slice(4);
      eventStartDate = startDateBeg + startDateEnd;
    } else if (startMonthMatch && startMonthMatch[0].length === 3) {
      eventStartDate = startMonthMatch[0];
    }
    //update startTime
    startTimeMatch = eventDate.when.match(/\d{2}:\d{2}/);
    let startTime = startTimeMatch?.[0];
    if (!startTime) {
      startTime = "08:00";
    }
    const startDateString = `${eventStartDate} ${startTime}`;
    const startDateTime = parse(startDateString, "MMM d HH:mm", new Date());

    //create fictituous endTime, event is assumed to end same day and last 1 hr
    const parsedTime = parse(startTime, "HH:mm", new Date());
    const endTimeString = addMinutes(parsedTime, 60).toString();
    endTimeMatch = endTimeString.match(/\d{2}:\d{2}/);
    const endTime = endTimeMatch?.[0];
    const endDateString = `${eventStartDate} ${endTime}`;
    const endDateTime = parse(endDateString, "MMM d HH:mm", new Date());

    const endFormatted = format(endDateTime, "MM/dd/yyyy hh:mm aa");
    const startFormatted = format(startDateTime, "MM/dd/yyyy hh:mm aa");

    return {
      startDate: startFormatted,
      endDate: endFormatted,
    };
  };

  if (!thisEvent || !thisEvent.date) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full bg-white rounded-xl m-4 p-3 text-slate shadow-xl hover:scale-110 transition duration-150 ease-in-out ">
      <div className="flex flex-col h-full">
        <div className="flex h-4/5">
          <div className="w-3/4 ml-2 pl-2">
            <h2 className="text-sm mb-2">{thisEvent.title}</h2>
            <div className="flex text-xs pr-2">
              <ul className="text-slate-light">
                <li>Event date: {thisEvent.date.when}</li>
                <li>Venue: {thisEvent.venue.name}</li>
                <li>Event location: {thisEvent.address[1]}</li>
                <li>Event Host: {thisEvent.ticket_info[0].source}</li>
                <li className="text-blue w-fit p-1 rounded-lg hover:bg-slate hover:text-white">
                  <Link href={thisEvent.ticket_info[0].link}>Ticket info</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-20 h-20">
            <img
              src={thisEvent.thumbnail}
              alt={thisEvent.title}
              object-cover
              rounded-full
            />
          </div>
        </div>
        <div className="flex justify-end mr-3">
          {eventRegBool ? (
            <div
              title="Add to Calendar"
              className="addeventatc sm:w-auto p-2 sm:px-4"
            >
              Add to Calendar
              <span className="start">
                {formatDateInput({ eventDate: thisEvent.date }).startDate}
              </span>
              <span className="end">
                {formatDateInput({ eventDate: thisEvent.date }).endDate}
              </span>
              <span className="timezone">Europe/London</span>
              <span className="title">{thisEvent.title}</span>
              <span className="description">
                **CHECK ABOVE DATES/TIMES ARE CORRECT WITH ORGANISER AND AMEND
                AS REQUIRED**{thisEvent.description}
              </span>
              <span className="location">
                {thisEvent.address[0]}, {thisEvent.address[1]}
              </span>
            </div>
          ) : (
            <></>
          )}
          <EventCardButton handleClick={handleRegisterClick} text="Register" />
        </div>
      </div>
    </div>
  );
}
