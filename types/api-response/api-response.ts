import { SERVICE_DURATIONS } from "@/constant/service-duration.constant";
import { STAFF_AVAILABILITY } from "@/constant/staff-availability.constant";
import { StaffType } from "../static-types/static-types";

export interface IOrganization {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  orgId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export type StaffAvailability = (typeof STAFF_AVAILABILITY)[number];

export interface IStaff {
  _id: string;
  orgId: string;
  name: string;
  staffType: StaffType;
  dailyCapacity: number;
  availabilityStatus: StaffAvailability;
  createdAt: string;
  updatedAt: string;
}

export type ServiceDuration = (typeof SERVICE_DURATIONS)[number];

export interface IService {
  _id: string;
  orgId: string;
  name: string;
  durationMinutes: ServiceDuration;
  requiredStaffType: StaffType;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus =
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW"
  | "WAITING";

export interface IAppointment {
  _id: string;
  orgId: string;
  customerName: string;
  serviceId: string;
  staffId: string | null;
  startTime: string; // ISO
  endTime: string; // ISO
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IWaitingQueueItem {
  _id: string;
  orgId: string;
  appointmentId: string;
  requiredStaffType: StaffType;
  appointmentTime: string;
  queuePosition: number;
  createdAt: string;
}

export type ActivityAction =
  | "APPOINTMENT_CREATED"
  | "APPOINTMENT_CANCELLED"
  | "QUEUE_ADDED"
  | "QUEUE_ASSIGNED"
  | "STAFF_ASSIGNED";

export interface IActivityLog {
  _id: string;
  orgId: string;
  actionType: ActivityAction;
  message: string;
  appointmentId?: string;
  staffId?: string;
  createdAt: string;
}

export interface IStaffLoadSummary {
  staffId: string;
  name: string;
  used: number;
  capacity: number;
}

export interface IDashboardStats {
  totalAppointmentsToday: number;
  completedToday: number;
  pendingToday: number;
  waitingQueueCount: number;
  staffLoad: IStaffLoadSummary[];
}
