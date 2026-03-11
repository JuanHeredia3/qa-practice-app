import type { AxiosInstance } from "axios";
import type { Column } from "../types/columns.dto";

export class BoardsService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api
  }

  async getColumnsByBoardId(id: string) {
    const response = await this.api.get<Column[]>(`/boards/columns/${id}`);
    return response;
  }
}