import type { AxiosInstance } from "axios";
import type { CreateTracker, Tracker } from "../types/tracker.dto";
import type { Habit } from "@/features/Habits/types/habit.dto";
import type { Board } from "@/features/Tracker/types/board.dto";

export class TrackerService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }

  async getTrackers() {
    const response = await this.api.get<Tracker[]>('/trackers');
    return response;
  }

  async getTrackerById(id: string) {
    const response = await this.api.get<Tracker>(`/trackers/${id}`);
    return response;
  }

  async getHabitsByTrackerId(id: string) {
    const response = await this.api.get<Habit[]>(`/trackers/habits/${id}`);
    return response;
  }

  async getBoardByTrackerId(id: string) {
    const response = await this.api.get<Board>(`/trackers/board/${id}`);
    return response;
  }

  async createTracker(tracker: CreateTracker) {
    const response = await this.api.post<Tracker>(`/trackers`, tracker);
    return response;
  }
}