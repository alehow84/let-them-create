import { NextResponse } from "next/server";
import { getJson } from "serpapi";

//define function to request info from
export const getEvents = async () => {
  const params = {
    engine: "google_events",
    q: `arts & crafts class`,
    hl: "en",
    gl: "uk",
    api_key: process.env.NEXT_PUBLIC_SERPAPI_KEY,
  };
  try {
    const res = await getJson(params);
    return NextResponse.json(res["events_results"]);
  } catch (error: any) {
    console.error("Error fetching creative events: ", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

//nextjs route handles function as a GET request
export async function GET() {
  return getEvents();
}
