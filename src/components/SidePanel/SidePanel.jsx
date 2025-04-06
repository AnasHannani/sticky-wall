// Import du contexte d'application
import { useApp } from "../../hooks/useApp";
// Import des composants de section
import Tasks from "./sections/Tasks";
import Lists from "./sections/Lists";
import Tags from "./sections/Tags";
import Header from "./Header";

// Import des icônes
import { Settings, Logout } from "../../assets/icons";

function SidePanel() {
  // Récupération des valeurs et fonctions depuis le contexte
  const {
    toggleMenu,         // Fonction pour ouvrir/fermer le menu (mobile)
    setPageTitle,       // Fonction pour mettre à jour le titre de la page
    activeTask,         // Tâche active sélectionnée
    setActiveTask,      // Fonction pour définir la tâche active
    activeList,         // Liste active sélectionnée
    setActiveList,      // Fonction pour définir la liste active
    tasks,              // Liste complète des tâches
    handleAddTag,       // Fonction pour ajouter un nouveau tag
  } = useApp();

  return (
    // Conteneur principal du panneau latéral
    <div
      className={`h-full m-2 flex flex-col bg-gray-100 rounded-xl drop-shadow-md transition-all duration-300`}
    >
      {/* En-tête du panneau (contient le bouton de fermeture sur mobile) */}
      <Header toggleMenu={toggleMenu} />

      {/* Zone de contenu déroulante */}
      <div
        className="flex-1 overflow-y-auto
                  [&::-webkit-scrollbar]:w-1               // Largeur de la scrollbar
                  [&::-webkit-scrollbar-track]:bg-gray-100 // Couleur de la piste
                  [&::-webkit-scrollbar-thumb]:bg-gray-300 // Couleur du curseur
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 // Mode sombre
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {/* Section Tâches */}
        <Tasks
          items={tasks}                   // Liste des tâches à afficher
          activeItem={activeTask}         // Tâche actuellement sélectionnée
          onItemClick={setActiveTask}    // Handler de sélection
          setPageTitle={setPageTitle}     // Mise à jour du titre
        />

        {/* Section Listes */}
        <Lists
          activeItem={activeList}         // Liste actuellement sélectionnée
          onItemClick={setActiveList}     // Handler de sélection
          setPageTitle={setPageTitle}    // Mise à jour du titre
        />

        {/* Section Tags */}
        <Tags 
          onAddTag={handleAddTag}         // Handler d'ajout de tag
          setPageTitle={setPageTitle}     // Mise à jour du titre
        />
      </div>

      {/* Pied de page du panneau */}
      <div className="mt-auto border-t border-gray-200">
        <ul>
          {/* Option Paramètres */}
          <li className="flex items-center h-12 px-4 hover:bg-gray-200 cursor-pointer">
            <Settings />
            <span className="ml-2">Settings</span>
          </li>
          
          {/* Option Déconnexion */}
          <li className="flex items-center h-12 px-4 hover:bg-gray-200 cursor-pointer">
            <Logout />
            <span className="ml-2">Sign out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidePanel;