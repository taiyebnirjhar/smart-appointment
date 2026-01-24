export const SERVICE_DURATIONS = [
  15, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 420, 480, 540, 600,
] as const;

export const SERVICE_DURATION_OPTIONS = SERVICE_DURATIONS.map((minutes) => ({
  value: minutes,
  label:
    minutes < 60
      ? `${minutes} min`
      : `${minutes / 60} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}`,
}));
