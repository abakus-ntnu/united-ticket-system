export type AttendantType = {
  id: number;
  name: string;
  email: string;
  group: string;
  ticket_sent: boolean;
  registered: boolean;
  attended: boolean;
  foto_consent: boolean;
  qr: string | null;
};

export type CreateAttendantType = Pick<
  AttendantType,
  "name" | "email" | "group"
>;
