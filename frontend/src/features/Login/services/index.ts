import { UserRepository } from "./user.repository";
import { api } from "../../../shared/api";
import { UserManager } from "./user.manager";
import mappers from "../utils/mappers";

const userRepository = new UserRepository(api);
const userManager = new UserManager(userRepository, mappers);

export default userManager;