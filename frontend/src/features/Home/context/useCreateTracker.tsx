import { useState } from "react";
import { toast } from "sonner";
import trackerService from "../services";

export const useCreateTracker = () => {
  const [openModal, setOpenModal] = useState(false);
  const [trackerTitle, setTrackerTitle] = useState('');
  const [trackerDescription, setTrackerDescription] = useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (trackerTitle.trim() == "" || trackerDescription.trim() == "") {
      toast.error('Tanto el nombre como la descripción del tracker deben tener un valor');
      return;
    }

    try {
      const createdTracker = await trackerService.createTracker({ name: trackerTitle, description: trackerDescription });

      toast.success(`Tracker "${createdTracker.data.name}" creado exitosamente`,{
        duration: 5000,
        position: 'top-center',
      });

      setOpenModal(false);
    } catch (error) {
      toast.error('No se ha podido crear el tracker');
    }
  }

  return {
    openModal,

    setOpenModal,
    setTrackerTitle,
    setTrackerDescription,
    handleSubmit
  }
}
