import api from "../../../shared/api";
import { BoardsService } from "./boards.service";
import { ColumnsService } from "./columns.service";

export const columnsService = new ColumnsService(api);
export const boardsService = new BoardsService(api);
