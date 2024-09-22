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
import {
  format,
  parse,
  addMinutes,
  differenceInMinutes,
  addDays,
} from "date-fns";
import Link from "next/link";
import EventCardButton from "./static/EventCardButton";

export default function EventCard({ thisEvent }: { thisEvent: any }) {
  type EventDate = {
    start_date: string;
    when: string;
  };

  function formatEventDates({ eventDate }: { eventDate: EventDate }) {
    if (!eventDate) {
      return {
        startDate: "10/06/2024 09:00 AM",
        endDate: "10/06/2024 11:00 AM",
      };
    }
    console.log(eventDate, "<<eventDate in formatEventDates");
    const [startTime, endTime] = eventDate.when.split("-");

    const startDateTime = parse(
      `${eventDate.start_date} ${startTime}`,
      "MMM d h:mm",
      new Date()
    );

    let endDateTime = parse(
      `${eventDate.start_date} ${endTime}`,
      "MMM d h:mm",
      new Date()
    );

    if (endDateTime < startDateTime) {
      endDateTime = addDays(endDateTime, 1);
    }

    const durationMinutes = differenceInMinutes(endDateTime, startDateTime);
    const finalEndDateTime = addMinutes(startDateTime, durationMinutes);

    const startFormatted = format(startDateTime, "MM/dd/yyyy hh:mm aa");
    const endFormatted = format(finalEndDateTime, "MM/dd/yyyy hh:mm aa");

    return {
      startDate: startFormatted,
      endDate: endFormatted,
    };
  }
  console.log(thisEvent.date, "<<thisEvent.date");
  const formattedDates = formatEventDates(thisEvent.date);

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
          {/* <EventCardButton text="Add to calendar" /> */}
          <div title="Add to Calendar" className="addeventatc">
            Add to Calendar
            <span className="start">{formattedDates.startDate}</span>
            <span className="end">{formattedDates.endDate}</span>
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
