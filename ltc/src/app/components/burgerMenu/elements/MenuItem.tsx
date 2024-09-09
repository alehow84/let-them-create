import Link from "next/link";

export default function MenuItem({
  title,
  page,
}: {
  title: string;
  page: string;
}) {
  return (
    <div className="bg-slate bg-opacity-75 hover:bg-sky text-white hover:text-slate rounded p-3 ml-1.5 mr-1.5 transition duration-150 ease-in-out">
      <Link href={`${page}`}>{title}</Link>
    </div>
  );
}
