// Import des composants nécessaires
import SidePanel from "../components/Sidepanel/SidePanel";
import MainContent from "../components/MainContent/MainContent";
// Import du contexte d'application pour gérer l'état global
import { useApp } from "../hooks/useApp";

function Home() {
  // Récupération des états et fonctions du contexte
  const { isMenuOpen, toggleMenu, pageTitle } = useApp();

  return (
    <>
      {/* Conteneur principal */}
      <div className="flex h-screen text-gray-800">
        {/* Panel latéral (sidebar) */}
        <div
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          {/* 
            SidePanel - Le menu de navigation 
            - Fixé à gauche de l'écran
            - Animation de transition pour l'ouverture/fermeture
            - Toujours visible sur écran large (sm:translate-x-0)
            - Caché à gauche sur mobile quand fermé (-translate-x-full)
          */}
          <SidePanel />
        </div>

        {/* Bouton de toggle pour le menu mobile */}
        <button
          className={`inline-flex items-center p-2 m-2 mt-3 text-sm bg-gray-100 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
            isMenuOpen && "invisible"
          } transition-all duration-200`}
          onClick={toggleMenu}
        >
          {/* Texte accessible uniquement aux lecteurs d'écran */}
          <span className="sr-only">Open sidebar</span>
          {/* Icône du menu hamburger */}
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        {/* Contenu principal */}
        <main className={`flex-1 p-4 overflow-auto transition-margin duration-300 sm:ml-64`}>
          {/*
            MainContent - Le contenu principal de la page
            - Prend tout l'espace disponible (flex-1)
            - Marge à gauche sur écran large pour accommoder le sidebar (sm:ml-64)
            - Animation de transition pour le décalage
            - Reçoit le titre de page comme prop
          */}
          <MainContent pageTitle={pageTitle} />
        </main>
      </div>
    </>
  );
}

export default Home;