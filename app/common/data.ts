// data.ts
import { TeamMember, Appointment, Client } from "@/app/common/type";

export const hours: string[] = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
];
export const minuteIncrements: string[] = ["00", "15", "30", "45"];

export const timeOptions: string[] = [];
["6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5"].forEach(
  (hour) => {
    minuteIncrements.forEach((minute) => {
      timeOptions.push(`${hour}:${minute} am`);
      timeOptions.push(`${hour}:${minute} pm`);
    });
  }
);

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Member 1", color: "bg-orange-400" },
  { id: 2, name: "Mem ber 2", color: "bg-green-400" },
  { id: 3, name: "Member 3", color: "bg-teal-400" },
  { id: 4, name: "Member 4", color: "bg-blue-300" },
  { id: 5, name: "Member 5", color: "bg-blue-400" },
  { id: 6, name: "Member 6", color: "bg-green-300" },
  { id: 7, name: "Member 7", color: "bg-pink-400" },
  { id: 8, name: "Member 8", color: "bg-yellow-300" },
  { id: 9, name: "Member 9", color: "bg-red-300" },
  { id: 10, name: "Member 10", color: "bg-purple-400" },
  { id: 11, name: "Member 11", color: "bg-yellow-400" },
];

export const initialAppointments: Appointment[] = [
  {
    id: 1,
    memberId: 1,
    clientName: "Client Name",
    startTime: "10:30 am",
    endTime: "10:45 am",
    column: 2,
    date: new Date(),
  },
  {
    id: 2,
    memberId: 1,
    clientName: "Client Name",
    startTime: "8:00 am",
    endTime: "8:30 am",
    column: 4,
    date: new Date(),
  },
  {
    id: 3,
    memberId: 3,
    clientName: "Client Name",
    startTime: "9:30 am",
    endTime: "10:00 am",
    column: 3,
    date: new Date(),
  },
  {
    id: 4,
    memberId: 8,
    clientName: "Client Name",
    startTime: "11:30 am",
    endTime: "12:00 pm",
    column: 5,
    date: new Date(),
  },
  {
    id: 5,
    memberId: 6,
    clientName: "Client Name",
    startTime: "1:15 pm",
    endTime: "2:00 pm",
    column: 6,
    date: new Date(),
  },
  {
    id: 6,
    memberId: 2,
    clientName: "Client Name",
    startTime: "12:30 pm",
    endTime: "1:00 pm",
    column: 2,
    date: new Date(),
  },
];

export const initialClients: Client[] = [
  {
    id: 1,
    name: "Cameron Williamson",
    address: "4140 Parker Rd.",
    location: "Allentown, New Mexico 31134",
    jobNumber: "JOB106731",
    assigned: false,
  },
  {
    id: 2,
    name: "Cameron Williamson",
    address: "4140 Parker Rd.",
    location: "Allentown, New Mexico 31134",
    jobNumber: "JOB106731",
    assigned: false,
  },
  {
    id: 3,
    name: "Cameron Williamson",
    address: "4140 Parker Rd.",
    location: "Allentown, New Mexico 31134",
    jobNumber: "JOB106731",
    assigned: false,
  },
  {
    id: 4,
    name: "Cameron Williamson",
    address: "4140 Parker Rd.",
    location: "Allentown, New Mexico 31134",
    jobNumber: "JOB106731",
    assigned: false,
  },
];
