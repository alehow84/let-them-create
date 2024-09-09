export default function MenuItem({
  title,
  page,
}: {
  title: string;
  page: string;
}) {
  return (
    <a
      className="bg-slate bg-opacity-75 hover:bg-sky text-white hover:text-slate rounded p-3 ml-1.5 mr-1.5 transition duration-150 ease-in-out"
      href={`/${page}`}
    >
      {title}
    </a>
  );
}
