import { WorkingDaySummary } from './working-day-summary.model';

export interface Timesheet {
    month: String;
    workingDays: WorkingDaySummary[];
}
