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
"use client";

import {
  format,
  parse,
  addMinutes,
  differenceInMinutes,
  addDays,
} from "date-fns";
import Link from "next/link";
import EventCardButton from "./static/EventCardButton";
import { useEffect, useState } from "react";

export default function EventCard({
  thisEvent,
}: {
  thisEvent: any;
  eventState: any;
}) {
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  useEffect(() => {
    if (thisEvent) {
      setCurrentEvent(thisEvent);
    }
  }, [thisEvent]);

  type EventDate = {
    start_date: string;
    when: string;
  };

  const formatDates = ({ eventDate }: { eventDate: EventDate }) => {
    if (!eventDate) {
      return {
        startDate: "10/06/2024 09:00 AM",
        endDate: "10/06/2024 11:00 AM",
      };
    }

    let startTimeMatch = null;
    let startTime = null;
    let eventStartDate = null;
    let eventEndDate = null;
    let endTime = null;

    //need to check if there is a - in eventDate.when, and if so proceed. if there isn't one, startTime is the result of matching time format digits, and endTime is assumed to be this + 1hrs
    if (!/–/.test(eventDate.when)) {
      startTimeMatch = eventDate.when.match(/\d{2}:\d{2}/);
      startTime = startTimeMatch?.[0];
      //need to handle how i will get endTime in this block
    } else {
      //need to remove the rest of the string from startTime
      let [startTimeString, endTimeString] = eventDate.when.split("–");
      startTimeMatch = startTimeString.match(/\d{2}:\d{2}/);
      //define startTime as the isolated start time string
      startTime = startTimeMatch?.[0];
      const endTimeMatch = endTimeString.match(/\d{2}:\d{2}/);
      endTime = endTimeMatch?.[0];
    }

    //make sure the abbreviated month in eventDate.start_date is only 3 chars to enable parsing
    const startMonthMatch = eventDate.start_date?.match(/^[A-Za-z]+/);
    if (startMonthMatch && startMonthMatch[0].length > 3) {
      const truncEventStart = eventDate.start_date;
      const startDateBeg = truncEventStart.slice(0, 3);
      const startDateEnd = truncEventStart.slice(4);
      eventStartDate = startDateBeg + startDateEnd;
    } else if (startMonthMatch && startMonthMatch[0].length === 3) {
      eventStartDate = startMonthMatch[0];
    }
    const startDateString = `${eventStartDate} ${startTime}`;
    const startDateTime = parse(startDateString, "MMM d HH:mm", new Date());

    // console.log(
    //   eventStartDate,
    //   "<<eventStartDate",
    //   endTimeString,
    //   "<<1endTime"
    // );

    //need to check if endTime contains a string match.
    //define a variable endMonthMatch to contain endTime?.match(/^[A-Za-z]+/)
    //@@if that variable is true, then endTime = endTime.match(/\d{2}:\d{2}/)[0]

    /*
    -if eventDate.when starts with a number
    - define a variable to contain the results of 1)match up to two digits \d{1,2}.  & 2) matching an abbreviated month
    - truncate the month if it is longer than 3 chars
    -concatenate and reassign to eventEndDate
    @@ - if endMonthMatch is false, reassign eventEndDate to be eventStartDate
    */
    const endMonthMatch = endTime?.match(/^[A-Za-z]+/);
    if (endMonthMatch && endMonthMatch[0].length)
      // const endTimeMonth = endTimeString?.match(/^[A-Za-z]+/);
      // console.log(endTimeString?.match(/^[A-Za-z]+/), "endTime?.match(/^[A-Za-z]+/)");
      // console.log(!endTimeMonth, "<<!endTimeMonth");
      // if (endTimeMonth && endTimeMonth[0].length > 3) {
      //   endTimeString = endTimeString?.match(/\d{2}:\d{2}/)[0];
      //   console.log(endTimeString, "<<2endTime");
      //   eventEndDate = endTimeMonth[0].slice(0, 3);
      // } else {
      //   eventEndDate = eventStartDate;
      // }

      // let endDateTime = parse(
      //   `${eventEndDate} ${endTime}`,
      //   "MMM d HH:mm",
      //   new Date()
      // );

      //won't need this bit
      // console.log(endDateTime, "<<endDateTime");
      // if (endDateTime < startDateTime) {
      //   endDateTime = addDays(endDateTime, 1);
      // }

      //won't need this bit
      // const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
      // const finalEndDateTime = addMinutes(startDateTime, durationMinutes);

      const startFormatted = format(startDateTime, "MM/dd/yyyy hh:mm aa");
    //change finalEndDateTime here to be endDateTime
    const endFormatted = format(finalEndDateTime, "MM/dd/yyyy hh:mm aa");

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
                {}
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
          <EventCardButton text="Register" />
          <div title="Add to Calendar" className="addeventatc">
            Add to Calendar
            <span className="start">10/06/2024 09:00 AM</span>
            <span className="end">10/06/2024 11:00 AM</span>
            <span className="timezone">Europe/London</span>
            <span className="title">{thisEvent.title}</span>
            <span className="description">{thisEvent.description}</span>
            <span className="location">
              {thisEvent.address[0]}, {thisEvent.address[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

//start {formatDates({ eventDate: thisEvent.date }).startDate}
//end  {formatDates({ eventDate: thisEvent.date }).endDate}
