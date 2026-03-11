export interface Tracker {
  id:          string;
  username:    string;
  name:        string;
  modified_at: Date;
  created_at:  Date;
  description: string;
}

export interface CreateTracker {
  name:        string;
  description: string;
}
