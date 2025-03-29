// Import du composant SectionHeader pour l'affichage des en-têtes de section
import SectionHeader from "./components/SectionHeader";
// Import du hook useApp pour accéder au contexte de l'application
import { useApp } from "../../../data/DataContext";

// Définition du composant Tasks
const Tasks = () => {
  // Récupération des données et fonctions nécessaires depuis le contexte
  const { 
    tasks,          // Liste des tâches
    activeTask,     // Index de la tâche active
    setActiveTask,  // Fonction pour définir la tâche active
    setPageTitle,    // Fonction pour mettre à jour le titre de la page
    handleSearch, // Fonction pour effectuer une recherche
  } = useApp();

  return (
    <div className="px-4 pb-2 pt-4">
      {/* En-tête de section "TASKS" */}
      <SectionHeader title="TASKS" />
      
      {/* Liste des tâches */}
      <ul className="space-y-1">
        {/* Mapping sur chaque tâche pour créer un élément de liste */}
        {tasks.map((item, index) => (
          <li
            key={index}  // Clé unique pour React
            className={`flex h-10 items-center justify-between rounded-md p-2 cursor-pointer ${
              // Style conditionnel : fond gris si la tâche est active, fond gris au survol sinon
              activeTask === index ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              // Au clic sur une tâche :
              setActiveTask(index);      // Définit cette tâche comme active
              setPageTitle(item.name);   // Met à jour le titre de la page avec le nom de la tâche
              
              handleSearch(); // Effectue une recherche

            }}
          >
            {/* Contenu de l'élément de tâche */}
            <div className="flex items-center">
              {/* Icône de la tâche */}
              <span className="mr-2">{item.icon}</span>
              {/* Nom de la tâche avec style conditionnel (gras si active) */}
              <span
                className={`text-sm ${
                  activeTask === index ? "font-semibold" : "font-normal"
                }`}
              >
                {item.name}
              </span>
            </div>
            
            {/* Affichage du nombre d'éléments si amount > 0 */}
            {item.amount > 0 && (
              <span className="rounded-md bg-gray-200 px-2 py-0.5 text-xs">
                {item.amount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;