interface Venue {
  name: string;
  rating: number | null;
  reviews: number | null;
  link: string | null;
}

interface TicketInfo {
  source: string;
  link: string;
  link_type: string;
}

interface Date {
  start_date: string;
  when: string | null;
}

export interface Event {
  title: string;
  date: Date;
  address: string[];
  description: string;
  ticket_info: TicketInfo[];
  venue: Venue;
  thumbnail: string | null;
  image: string | null;
}
