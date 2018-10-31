import { Break } from './break.model';

export interface WorkingDay {
  id: string;
  day: string;
  start: string;
  end: string;

  description: string;

  breaks: Break[];
}
