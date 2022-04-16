import { Attendee } from "../types";

const validateAttendee = (attendee: Partial<Attendee>) =>
  attendee.name.length > 0 &&
  attendee.email.length > 0 &&
  attendee.group.length > 0;

export default validateAttendee;
