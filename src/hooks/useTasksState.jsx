import { useState } from "react";
import {
  ArrowRightDouble,
  CalendarDays,
  StickyNote,
  Tasks,
} from "../assets/icons";

// Définit les tâches par défaut directement dans le hook ou les importe depuis un fichier de constantes
const DEFAULT_TASKS = [
  { name: "Upcoming", icon: <ArrowRightDouble />, amount: 12 }, // Exemple de quantités
  { name: "Today", icon: <Tasks />, amount: 5 },
  { name: "Calendar", icon: <CalendarDays />, amount: 0 },
  { name: "Sticky Wall", icon: <StickyNote />, amount: 0 },
];

// Hook personnalisé pour gérer l'état des tâches
export const useTasksState = (initialActiveTask = 3) => {
  // Les tâches sont principalement statiques, elles peuvent être retournées directement
  // Si les quantités nécessitent des mises à jour dynamiques basées sur des notes/etc., ce hook gérera cette logique.
  const [tasks] = useState(DEFAULT_TASKS);

  // État pour suivre la tâche active (par défaut "Sticky Wall")
  const [activeTask, setActiveTask] = useState(initialActiveTask);

  // Retourne les tâches, la tâche active et la fonction pour mettre à jour la tâche active
  return {
    tasks, // Liste des tâches
    activeTask, // Tâche actuellement active
    setActiveTask, // Fonction pour changer la tâche active
  };
};
