"use client";

import { format, parse, addMinutes } from "date-fns";
import Link from "next/link";
import EventCardButton from "./static/EventCardButton";
import Check from "../../public/icons/check-solid.svg";
import Image from "next/image";
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
  const [staffUserBool, setStaffUserBool] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (thisEvent) {
      setCurrEvent(thisEvent);
    }
  }, [thisEvent]);

  useEffect(() => {
    checkEventReg(user, thisEvent);
  }, [user, thisEvent, eventRegBool]);

  useEffect(() => {
    const initializeButton = () => {
      if (window.addeventatc) {
        window.addeventatc.refresh();
      }
    };

    if (eventRegBool) {
      if (window.addeventatc) {
        initializeButton();
      } else {
        const script = document.createElement("script");
        script.src = "https://cdn.addevent.com/libs/atc/1.6.1/atc.min.js";
        script.onload = initializeButton;
        document.body.appendChild(script);
      }
    }
  }, [eventRegBool]);

  type EventDate = {
    start_date: string;
    when: string;
  };

  const checkEventReg = async (user: any, currentEvent: Event) => {
    try {
      if (user && user.documentId) {
        const userDocRef = doc(db, "users", user.documentId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.events) {
            userData.events.forEach((event: Event) => {
              if (
                event.title === currentEvent.title &&
                event.date.when === currentEvent.date.when &&
                event.address[0] === currentEvent.address[0]
              ) {
                setEventRegBool(true);
              }
            });
          }
        } else {
          //assumes if userDocSnap doesn't exist, the user must be a staff member
          setStaffUserBool(true);
        }
      }
    } catch (error) {
      alert(`Something went wrong: ${error}. Please contact admin`);
      // console.log("Error in checkEventReg:", error);
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
      alert(`Something went wrong: ${error}. Please contact admin`);
      // console.log("Error in handleRegisterClick:", error);
    }
  };

  const formatDateInput = ({ eventDate }: { eventDate: EventDate }) => {
    //format the date for the purposes of enabling adding to calendar with loosely accurate date info. Uses the correct start date and time, but assumes event ends on the same day and is 1 hour long
    let eventStartDate = null;
    let startTimeMatch = null;
    let endTimeMatch = null;
    const startMonthMatch = eventDate.start_date?.match(/^[A-Za-z]+/);

    //check for "perfect" start_date format i.e. Oct 22, can be passed straight to eventStartDate
    if (/^[A-Za-z]{3} \d{2}$/.test(eventDate.start_date)) {
      eventStartDate = eventDate.start_date;
    } else if (/^[A-Za-z]{3} \d{1}$/.test(eventDate.start_date)) {
      //check for strictly for 3 char month followed by single digit date in start_date
      const startDateBegMatch = eventDate.start_date.match(/^[A-Za-z]{3} /);
      const startDateBeg = startDateBegMatch?.[0];
      const startDateDayMatch = eventDate.start_date.match(/ \d{1}$/);
      let startDateDay = startDateDayMatch?.[0];
      startDateDay = startDateDay?.slice(1);
      eventStartDate = `${startDateBeg}0${startDateDay}`;
    } else if (
      //check for api cases where start month is 3+ chars and over 5 chars so as not to match "perfect" start_date format i.e. 4 char month, single digit day
      //don't like this condition
      startMonthMatch &&
      startMonthMatch[0].length > 3 &&
      startMonthMatch[0].length > 5
    ) {
      const truncEventStart = eventDate.start_date;
      const startDateBeg = truncEventStart.slice(0, 3);
      const startDateEnd = truncEventStart.slice(4);
      eventStartDate = startDateBeg + startDateEnd;
    } else if (/^[A-Za-z]{4} \d{2}$/.test(eventDate.start_date)) {
      const startDateBegMatch = eventDate.start_date.match(/^[A-Za-z]{4} /);
      let startDateBeg = startDateBegMatch?.[0];
      startDateBeg = startDateBeg?.slice(0, 3);
      const startDateEnd = eventDate.start_date.slice(4);
      eventStartDate = `${startDateBeg}${startDateEnd}`;
    }
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
    <div className="flex items-center justify-center h-full w-full max-w-sm md:max-w-lg bg-white rounded-xl m-4 p-3 text-slate shadow-xl hover:scale-105 transition duration-150 ease-in-out overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex h-full">
          <div className="w-4/5 ml-1 mr-1 pl-2">
            <h2 className="text-sm mb-2">{thisEvent.title}</h2>
            <div className="flex text-xs pr-2">
              <ul className="text-slate-light">
                <li>Event date: {thisEvent.date.when}</li>
                <li>
                  Venue:{" "}
                  {thisEvent.venue
                    ? thisEvent.venue.name
                    : "Please check with event host"}
                </li>
                <li>Event location: {thisEvent.address[0]}</li>
                <li>Event Host: {thisEvent.ticket_info[0].source}</li>
                <li className="text-blue w-fit p-1 rounded-lg hover:bg-slate hover:text-white">
                  <Link href={thisEvent.ticket_info[0].link}>Ticket info</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-20 h-20">
            <img src={thisEvent.thumbnail} alt={thisEvent.title} />
          </div>
        </div>
        <div className="flex justify-end mr-3">
          {eventRegBool ? (
            <div
              title="Add to Calendar"
              className="addeventatc w-auto p-2 px-4 md:w-auto"
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
                {thisEvent.address[0]}, {thisEvent.address[1]}{" "}
                {thisEvent.address[0] && thisEvent.address[1]
                  ? `${thisEvent.address[0]}, ${thisEvent.address[1]}`
                  : "Please check with event host"}
              </span>
            </div>
          ) : (
            <></>
          )}
          {!eventRegBool && !staffUserBool ? (
            <EventCardButton
              handleClick={handleRegisterClick}
              text="Register"
            />
          ) : (
            <></>
          )}
          {eventRegBool ? (
            <div className="flex items-center text-white text-sm rounded-full shadow-lg bg-emerald-600 pr-2 pl-2 hover:bg-sky hover:text-slate transition duration-150 ease-in-out ml-5 w-fit p-2">
              <div className="mr-1 min-w-sm">
                <Image
                  src={Check}
                  height={20}
                  width={20}
                  alt="registered for event"
                />
              </div>{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
