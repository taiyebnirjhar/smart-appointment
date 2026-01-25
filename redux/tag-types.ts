export enum TAG_TYPES {
  DASHBOARD = "dashboard",
  STAFF = "staff",
  STAFF_LOAD = "staff_load",
  SERVICE = "service",
  APPOINTMENT = "appointment",
  WAITING_LIST = "waiting_list",
  ACTIVITY_LOG = "activity_log",
}

export const tagTypesList = Object.values(TAG_TYPES).filter(
  (value) => typeof value === "string",
);
