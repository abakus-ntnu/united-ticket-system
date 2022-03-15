
export type AttendantType = {
    id: number;
    name: String;
    mail: String;
    group: String;
    ticket_sent: Boolean;
    registered: Boolean;
    attended: Boolean;
    foto_consent: Boolean;
  };

export type CreateAttendantType = Pick<AttendantType, "name"| "mail" | "group">
