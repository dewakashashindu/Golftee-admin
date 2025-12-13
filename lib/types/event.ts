export interface EventItem {
  id?: string;
  type: "EVENT" | "TOURNAMENT";
  title: string;
  description: string;

  start_date: string;
  start_time: string;
  location: string;

  registration_deadline: string;
  max_participants: number;

  entry_fee: number;
  prize_pool?: number;

  format?: string;
  status: string;
  poster_url?: string;
}
