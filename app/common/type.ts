// types.ts

export interface TeamMember {
    id: number;
    name: string;
    color: string;
  }

  export interface Appointment {
    id: number;
    memberId: number;
    clientName: string;
    startTime: string;
    endTime: string;
    column: number;
    date: Date;
  }

  export interface Client {
    id: number;
    name: string;
    address: string;
    location: string;
    jobNumber: string;
    assigned: boolean;
  }
