export default function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="py-4 px-10 max-w-sm mx-auto text-white bg-orange shadow-md rounded-xl hover:bg-amber  hover:text-blue transition ease-in-out duration-200"
    >
      {text}
    </button>
  );
}
