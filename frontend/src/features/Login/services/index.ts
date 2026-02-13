import { api } from "../../../shared/api";
import { UserService } from "./user.service";

const userService = new UserService(api);

export default userService;