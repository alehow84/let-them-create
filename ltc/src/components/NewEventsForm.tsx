"use client";

import SubmitButton from "./static/SubmitButton";
import eventThumbnail from "../../public/icons/eventThumbnail.svg";
import { Event } from "../types/EventTypes";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function NewEventsForm() {
  const [eventCreateErr, setEventCreateErr] = useState<any>(null);
  const { user } = useAuth();

  const handleNewEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const thisEventTitle = formData.get("title") as string;
    const startMonth = formData.get("start-date-month") as string;
    const startDay = formData.get("start-date-day") as string;
    const startDate = `${startMonth} ${startDay}`;
    const startTime = formData.get("when-start");
    const endTime = formData.get("when-end");
    const thisWhen = `${startTime}–${endTime}`;
    const address = formData.get("address") as string;
    const ticketLink = "https://let-them-create.vercel.app/";
    const venueName = formData.get("venue-name") as string;
    const newDescription = formData.get("description") as string;

    const newEvent: Event = {
      title: thisEventTitle,
      date: {
        start_date: startDate,
        when: thisWhen,
      },
      address: [address],
      description: newDescription,
      ticket_info: [
        {
          source: "Let Them Create",
          link: ticketLink,
          link_type: "tickets",
        },
      ],
      venue: {
        name: venueName,
        rating: null,
        reviews: null,
        link: null,
      },
      thumbnail: eventThumbnail,
      image: null,
    };
    e.currentTarget.reset();
    try {
      //check the logged in user is a staff member before attempting to create a new event
      if (user.email !== process.env.NEXT_PUBLIC_STAFF_EMAIL) {
        alert("Please Log in as a staff member to create a new event");
      } else {
        const staffDocRef = doc(db, "staff", user.documentId);
        const staffDocSnap = await getDoc(staffDocRef);
        //check the staffDoc can be found before attempting to update it
        if (staffDocSnap.exists()) {
          const staffData = staffDocSnap.data();
          if (!Array.isArray(staffData?.events)) {
            await updateDoc(staffDocRef, { events: [newEvent] });
          } else {
            await updateDoc(staffDocRef, { events: arrayUnion(newEvent) });
          }
          alert("Success: new event created!");
        }
      }
    } catch (error: any) {
      setEventCreateErr(error.message);
      alert(error.message);
    }
  };

  return (
    <form className="mt-8 mx-auto w-10/12 md:w-1/2" onSubmit={handleNewEvent}>
      <h1 className="text-center text-3xl text-slate py-2 mb-6">
        Create a new event
      </h1>
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div>
          <div className="flex flex-col mb-2">
            <label htmlFor="title" className="">
              Event Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Pottery for cat lovers..."
              required
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="start-date">Date</label>
            <div className="flex">
              <select
                name="start-date-month"
                id="start-date-month"
                className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
              >
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
              <select
                name="start-date-day"
                id="start-date-day"
                className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
                required
              >
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="when-start">Event Timings</label>
            <div className="flex">
              <select
                name="when-start"
                id="when-start"
                className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
              >
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
              <select
                name="when-end"
                id="when-end"
                className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
              >
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col mb-2">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="42 Craft Corner, Sometown"
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="ticket_info_link">Ticket link</label>
            <input
              id="ticket_info_link"
              name="ticket_info_link"
              type="text"
              placeholder="Website link for tickets"
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="venue-name">Venue</label>
            <input
              id="venue-name"
              name="venue-name"
              type="text"
              placeholder="LTC HQ"
              required
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="description">Event description</label>
        <div className="py-2 px-4 mb-2 bg-white rounded-sm shadow-slate shadow-md border border-slate">
          <textarea
            id="description"
            name="description"
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 "
            placeholder="Activity, skill level, audience etc..."
            required
          ></textarea>
        </div>
      </div>
      <div className="mt-4 mb-6">
        <SubmitButton text="Create Event" />
      </div>
    </form>
  );
}
