import React from "react";
// Importation des icônes depuis la bibliothèque react-icons
import { BsPlus } from "react-icons/bs"; // Icône Plus
import { FaCalendarDays } from "react-icons/fa6"; // Icône CalendarDays
import { FaTasks } from "react-icons/fa"; // Icône Tasks
import { HiOutlineLogout } from "react-icons/hi"; // Icône Logout
import { RiArrowRightDoubleFill, RiStickyNoteFill } from "react-icons/ri"; // Icônes ArrowRightDouble et StickyNote
import { VscSettings } from "react-icons/vsc"; // Icône Settings

// Icône flèche double droite
export const ArrowRightDouble = (props) => (
  <RiArrowRightDoubleFill {...props} />
);

// Icône calendrier
export const CalendarDays = (props) => <FaCalendarDays {...props} />;

// Icône supprimer
export const Delete = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

// Icône modifier
export const Edit = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

// Icône déconnexion
export const Logout = (props) => <HiOutlineLogout {...props} />;

// Icône plus
export const Plus = (props) => <BsPlus {...props} />;

// Icône paramètres
export const Settings = (props) => <VscSettings {...props} />;

// Icône recherche
export const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="size-4 text-gray-400 mx-2"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd"
    />
  </svg>
);

// Icône note collante
export const StickyNote = (props) => <RiStickyNoteFill {...props} />;

// Icône tâches
export const Tasks = (props) => <FaTasks {...props} />;
