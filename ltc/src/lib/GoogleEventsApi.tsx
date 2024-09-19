import { getJson } from "serpapi";

export const getCraftEvents = async () => {
  const params = {
    engine: "google",
    q: `arts & crafts class`,
    api_key: process.env.NEXT_PUBLIC_SERPAPI_KEY,
  };
  try {
    const response = await getJson(params);
    return response;
  } catch (error: any) {
    throw new Error("Failed to fetch creative events");
  }
};
