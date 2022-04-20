export type AttendantType = {
  id: string;
  name: string;
  email: string;
  group: string;
  ticket_sent: boolean;
  registered: boolean;
  attended: boolean;
  active: boolean;
  photo_consent: boolean;
  qr: string | null;
};

export type CreateAttendantType = Pick<
  AttendantType,
  "name" | "email" | "group"
>;
