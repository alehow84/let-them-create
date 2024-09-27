import SubmitButton from "./static/SubmitButton";

export default function NewEventsForm() {
  return (
    <form className="mx-auto">
      <div className="flex flex-col mb-2">
        <label htmlFor="title">Event Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Pottery for cat lovers..."
          className="py-2 px-6 max-w-sm mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="start-date">Date</label>
        <input
          id="start-date"
          name="start-date"
          type="text"
          placeholder="Oct 26"
          className="py-2 px-6 max-w-sm mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="when">Event Timings</label>
        <input
          id="when"
          name="when"
          type="text"
          placeholder="10:00-12:00"
          className="py-2 px-6 max-w-sm mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="42 Craft Corner, Sometown"
          className="py-2 px-6 max-w-sm mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="ticket_info_link">Ticket link</label>
        <input
          id="ticket_info_link"
          name="ticket_info_link"
          type="text"
          placeholder="Website link for tickets"
          className="py-2 px-6 max-w-sm mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="venue-name">Venue</label>
        <input
          id="venue-name"
          name="venue-name"
          type="text"
          placeholder="LTC HQ"
          className="py-2 px-6 max-w-sm mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="description">Event description</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Activity, skill level, audience etc..."
          className="py-2 px-6 max-w-lg mx-auto bg-white rounded-sm shadow-slate shadow-sm"
        />
      </div>

      <SubmitButton text="Create Event" />
    </form>
  );
}
