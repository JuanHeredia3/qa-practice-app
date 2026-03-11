import api from "../../../shared/api";
import { HabitService } from "./habits.service";

const habitsService = new HabitService(api);

export default habitsService;