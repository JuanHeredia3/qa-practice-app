export interface Habit {
  id: string;
  column_id: string;
  name: string;
  status: boolean;
  frequency: number[];
  time_spent: string;
  modified_at: string;
  created_at: string;
}
