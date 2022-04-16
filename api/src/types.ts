export interface Attendee {
  id: string;
  email: string;
  name: string;
  photo_consent?: boolean;
  group: string;
  admitted: Date;
  active: boolean;
  email_sent: boolean;
}
