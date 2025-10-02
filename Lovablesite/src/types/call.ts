export type CallRecord = {
  org_id: string;
  phone_from: string;
  phone_to: string;
  call_sid: string;
  duration_seconds: number;
  handled_by_ai: boolean;
  forwarded: boolean;
  appointment_booked: boolean;
  transcript: string;
};
