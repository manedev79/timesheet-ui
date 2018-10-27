import { Break } from './break.model';

export interface WorkingDay {
  day: string;
  start: string;
  end: string;

  breaks: Break[];
}
