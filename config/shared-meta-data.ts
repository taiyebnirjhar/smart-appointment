import type { Metadata } from "next";

export const sharedMetadata: Metadata = {
  title: {
    template: "%s | Smart Appointment",
    default: "Smart Appointment",
  },
  description: "Smart Appointment",
  icons: {
    icon: "/favicon.ico",
  },
};
