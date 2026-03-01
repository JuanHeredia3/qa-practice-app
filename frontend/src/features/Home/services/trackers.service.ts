import type { AxiosInstance } from "axios";
import type { Tracker } from "../types/tracker.dto";

export class TrackerService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }

  async getTrackers() {
    const response = await this.api.get<Tracker[]>('/trackers');
    return response;
  }
}