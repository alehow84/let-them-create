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

import { format, parse, addMinutes } from "date-fns";
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
    //function not quite working - does not correctly define the end date where there is a different end date to the start date in the second part of the eventDate.when string
    if (!eventDate) {
      return {
        startDate: "10/06/2024 09:00 AM",
        endDate: "10/06/2024 11:00 AM",
      };
    }

    let startTimeMatch = null;
    let endTimeMatch = null;
    let startTime = null;
    let eventStartDate = null;
    let eventEndDate = null;
    let endTime = null;
    let endDateString = null;
    let startDateString = null;
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
    startTime = startTimeMatch?.[0];
    startDateString = `${eventStartDate} ${startTime}`;
    const startDateTime = parse(startDateString, "MMM d HH:mm", new Date());

    //handle if there is an end time in eventDate.when, if not, create an endTime value (assumed +1hrs) and assign eventEndDate the same value as startDate
    if (!/–/.test(eventDate.when)) {
      startTimeMatch = eventDate.when.match(/\d{2}:\d{2}/);
      startTime = startTimeMatch?.[0];
      if (startTime) {
        const parsedTime = parse(startTime, "HH:mm", new Date());
        const endTimeString = addMinutes(parsedTime, 60).toString();
        endTimeMatch = endTimeString.match(/\d{2}:\d{2}/);
        endTime = endTimeMatch?.[0];
      }
      eventEndDate = eventStartDate;
    } else {
      //handle if there is a start and endTim in eventDate.when, split the string at the - and reassign values for parsing and formatting
      let [startTimeString, endTimeString] = eventDate.when.split("–");
      startTimeMatch = startTimeString.match(/\d{2}:\d{2}/);
      startTime = startTimeMatch?.[0];
      endTimeMatch = endTimeString.match(/\d{2}:\d{2}/);
      endTime = endTimeMatch?.[0];
      const endDateDayMatch = endTimeString.match(/\d{1,2} /);
      const endDateDay = endDateDayMatch?.[0];
      const endDateMonthMatch = endTimeString.match(/^[A-Za-z]+/);
      let endDateMonth = endDateMonthMatch?.[0];
      //iif there is a match for a seperate date in the endTimeString, format endDateString correctly for parsing
      if (endDateDay && endDateMonth) {
        if (endDateMonth.length <= 3) {
          endDateString = `${endDateMonth} ${endDateDay} ${endTime}`;
        } else {
          endDateMonth = endDateMonth.slice(0, 3);
          endDateString = `${endDateMonth} ${endDateDay} ${endTime}`;
        }
      }
    }

    endDateString = `${eventStartDate} ${endTime}`;

    let endDateTime = parse(endDateString, "MMM d HH:mm", new Date());

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
            <span className="start">
              {formatDates({ eventDate: thisEvent.date }).startDate}
            </span>
            <span className="end">
              {formatDates({ eventDate: thisEvent.date }).endDate}
            </span>
            <span className="timezone">Europe/London</span>
            <span className="title">{thisEvent.title}</span>
            <span className="description">
              CHECK TIMINGS WITH ORGANISER: {thisEvent.description}
            </span>
            <span className="location">
              {thisEvent.address[0]}, {thisEvent.address[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
