import { AttendantType } from "./types";

const validateAttendee = (attendee: Partial<AttendantType>) =>
  attendee.name && attendee.email && attendee.group;

export default validateAttendee;
