import type { AxiosInstance } from "axios";

export class ColumnsService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }
}