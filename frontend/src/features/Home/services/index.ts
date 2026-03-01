import api from "../../../shared/api";
import { TrackerService } from "./trackers.service";

const trackerService = new TrackerService(api);

export default trackerService;