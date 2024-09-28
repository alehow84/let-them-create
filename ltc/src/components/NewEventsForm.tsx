import SubmitButton from "./static/SubmitButton";

export default function NewEventsForm() {
  return (
    <form className="mt-8 mx-auto md:w-1/2">
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
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="start-date">Date</label>
            <input
              id="start-date"
              name="start-date"
              type="text"
              placeholder="Oct 26"
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="when">Event Timings</label>
            <input
              id="when"
              name="when"
              type="text"
              placeholder="10:00-12:00"
              className="py-2 px-6 max-w-md md:w-full text-ellipsis bg-white rounded-sm shadow-slate shadow-sm"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col mb-2">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
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
