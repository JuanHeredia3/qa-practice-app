import { useEffect, useState } from "react"
import type { Tracker } from "../types/tracker.dto";
import trackerService from "../services";

export const useTrackers = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const { data } = await trackerService.getTrackers();
        setTrackers(data);
      } catch (error) {
        setError("Error al cargar los trackers");
      } finally {
        setLoading(false);
      }
    }

    fetchTrackers();
  }, []);
  
  return {
    trackers,
    loading,
    error
  }
}
