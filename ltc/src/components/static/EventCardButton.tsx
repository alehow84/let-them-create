export default function EventCardButton({
  text,
  handleClick,
}: {
  text: string;
  handleClick: any;
}) {
  return (
    <button
      onClick={handleClick}
      className="text-white text-sm rounded-sm shadow-lg bg-orange pr-2 pl-2 hover:bg-sky hover:text-slate transition duration-150 ease-in-out ml-5 w-fit p-2"
    >
      {text}
    </button>
  );
}
