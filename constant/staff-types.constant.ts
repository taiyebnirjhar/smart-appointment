import { StaffType } from "@/types/static-types/static-types";

export const STAFF_TYPES: { label: string; value: StaffType }[] = [
  { label: "Doctor", value: "Doctor" },
  { label: "Consultant", value: "Consultant" },
  { label: "Support", value: "Support" },
  { label: "Nurse", value: "Nurse" },
  { label: "Technician", value: "Technician" },
  { label: "Therapist", value: "Therapist" },
  { label: "Pharmacist", value: "Pharmacist" },
  { label: "Administrator", value: "Administrator" },
  { label: "Receptionist", value: "Receptionist" },
  { label: "Lab Assistant", value: "Lab Assistant" },
  { label: "Radiologist", value: "Radiologist" },
  { label: "Surgeon", value: "Surgeon" },
  { label: "Paramedic", value: "Paramedic" },
  { label: "Intern", value: "Intern" },
  { label: "Manager", value: "Manager" },
  { label: "HR", value: "HR" },
  { label: "Finance", value: "Finance" },
  { label: "IT Support", value: "IT Support" },
  { label: "Operations", value: "Operations" },
  { label: "Quality Assurance", value: "Quality Assurance" },
  { label: "Medical Officer", value: "Medical Officer" },
  { label: "Care Coordinator", value: "Care Coordinator" },
  { label: "Clinical Assistant", value: "Clinical Assistant" },
  { label: "Supervisor", value: "Supervisor" },
  { label: "Director", value: "Director" },
  { label: "Other", value: "Other" },
];

export const STAFF_TYPE_VALUES = STAFF_TYPES.map((t) => t.value);
