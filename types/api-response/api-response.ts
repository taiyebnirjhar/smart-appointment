import { APPOINTMENT_STATUS } from "@/constant/appointment-status.constant";
import { STAFF_AVAILABILITY } from "@/constant/staff-availability.constant";
import { WAITING_QUEUE_STATUS } from "@/constant/waiting-queue-status";

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
  staffType: string;
  dailyCapacity: number;
  availabilityStatus: StaffAvailability;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  _id: string;
  orgId: string;
  name: string;
  durationMinutes: number;
  requiredStaffType: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[number];

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

  service?: IService;
  staff?: IStaff;
}

export type WaitingQueueStatus = (typeof WAITING_QUEUE_STATUS)[number];

export interface IWaitingQueueItem {
  _id: string;
  orgId: string;
  customerName: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: WaitingQueueStatus;
  createdAt: string;
  updatedAt: string;

  service?: IService;
  staff?: IStaff;
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
  updatedAt: string;
}

export interface IStaffLoadSummary {
  staffId: string;
  dailyCapacity: number;
  currentTaskCount: number;
  isFull: boolean;
  displayBadge: string;
}

export interface IDashboardStats {
  totalAppointmentsToday: number;
  completedToday: number;
  pendingToday: number;
  waitingQueueCount: number;
  staffLoad: IStaffLoadSummary[];
}
