export interface WorkingDaySummary {
  id: string;
  day: string;
  start: string;
  end: string;

  totalWork: string;
  totalBreak: string;

  description: string;
}
