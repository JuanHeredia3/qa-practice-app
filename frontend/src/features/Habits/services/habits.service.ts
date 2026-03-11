import type { AxiosInstance } from "axios";

export class HabitService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }
}