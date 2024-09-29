import { useSearch } from "@/contexts/SearchContext";

export default function Searchbar() {
  // const { searchInput, setSearchInput } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSearchInput(e.target.value);
  };

  return (
    <form action="" className="flex p-2 bg-white w-fit h-fit rounded-full">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          id="event-filter"
          name="event-filter"
          placeholder="Search Events"
          // value={}
          className="border-r-black border-l-white border-t-white border-b-white focus:outline-none"
          // onChange={handleChange}
        />
      </div>
      <div className="flex items-center pl-3">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          type="text"
          placeholder="Choose location"
          id="location-filter"
          name="location-filter"
          value={searchInput["location-filter"] || ""}
          className="pl-1 focus:outline-none border-none"
          onChange={handleChange}
        /> */}
        <button
          type="submit"
          className="bg-orange-light rounded-full p-2 hover:bg-slate hover:text-white transition ease-in-out duration-200"
        >
          search
        </button>
      </div>
    </form>
  );
}
