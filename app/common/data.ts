// data.ts
import { TeamMember, Appointment, Client } from "@/app/common/type";
import { generateTimeSlots } from "../utils/dateUtils";

// Generate time slots from 6am to 2pm as shown in the UI
export const hours: Date[] = generateTimeSlots(6, 15);

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
  { id: 1, name: "Member 1", color: "orange" },
  { id: 2, name: "Member 2", color: "green" },
  { id: 3, name: "Member 3", color: "teal" },
  { id: 4, name: "Member 4", color: "blue" },
  { id: 5, name: "Member 5", color: "blue" },
  { id: 6, name: "Member 6", color: "green" },
  { id: 7, name: "Member 7", color: "pink" },
  { id: 8, name: "Member 8", color: "yellow" },
  { id: 9, name: "Member 9", color: "red" },
  { id: 10, name: "Member 10", color: "purple" },
  { id: 11, name: "Member 11", color: "yellow" },
];

export const colorMap: { [key: string]: string } = {
  orange: "bg-orange-100 border-orange-200",
  green: "bg-green-100 border-green-200",
  teal: "bg-teal-100 border-teal-200",
  blue: "bg-blue-100 border-blue-200",
  pink: "bg-pink-100 border-pink-200",
  yellow: "bg-yellow-100 border-yellow-200",
  red: "bg-red-100 border-red-200",
  purple: "bg-purple-100 border-purple-200",
  gray: "bg-gray-400 border-gray-200",
};

const today = new Date();
const baseDate = new Date(today);
baseDate.setHours(0, 0, 0, 0);

export const initialAppointments: Appointment[] = [
  {
    id: 1,
    memberId: 1,
    clientName: "Client Name",
    startTime: new Date(baseDate.setHours(10, 30)),
    endTime: new Date(baseDate.setHours(10, 45)),
    timeSlot: new Date(baseDate.setHours(10, 30)),
  },
  {
    id: 2,
    memberId: 1,
    clientName: "Client Name",
    startTime: new Date(baseDate.setHours(8, 0)),
    endTime: new Date(baseDate.setHours(8, 30)),
    timeSlot: new Date(baseDate.setHours(8, 0)),
  },
  {
    id: 3,
    memberId: 3,
    clientName: "Client Name",
    startTime: new Date(baseDate.setHours(9, 30)),
    endTime: new Date(baseDate.setHours(10, 0)),
    timeSlot: new Date(baseDate.setHours(9, 30)),
  },
  {
    id: 4,
    memberId: 8,
    clientName: "Client Name",
    startTime: new Date(baseDate.setHours(11, 30)),
    endTime: new Date(baseDate.setHours(13, 30)),
    timeSlot: new Date(baseDate.setHours(11, 30)),
  },
  {
    id: 5,
    memberId: 6,
    clientName: "Client Name",
    startTime: new Date(baseDate.setHours(13, 15)),
    endTime: new Date(baseDate.setHours(14, 0)),
    timeSlot: new Date(baseDate.setHours(13, 15)),
  },
  {
    id: 6,
    memberId: 2,
    clientName: "Client Name",
    startTime: new Date(baseDate.setHours(12, 30)),
    endTime: new Date(baseDate.setHours(13, 0)),
    timeSlot: new Date(baseDate.setHours(12, 30)),
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
