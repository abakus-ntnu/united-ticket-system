export type AttendantType = {
  id: number;
  name: string;
  email: string;
  group: string;
  ticket_sent: boolean;
  registered: boolean;
  attended: boolean;
  photo_consent: boolean;
  qr: string | null;
};

export type CreateAttendantType = Pick<
  AttendantType,
  "name" | "email" | "group"
>;
