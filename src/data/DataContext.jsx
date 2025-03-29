// Import des dépendances React et des icônes
import { createContext, useContext, useState, useEffect } from "react";
import { RiArrowRightDoubleFill, RiStickyNoteFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

// 1. Création du contexte d'application
const AppContext = createContext();

// 2. Composant Provider qui englobe l'application
export const AppProvider = ({ children }) => {
  // ========== État global de l'UI ==========
  const [isMenuOpen, setIsMenuOpen] = useState(true); // État d'ouverture du menu
  const [pageTitle, setPageTitle] = useState("Sticky Wall"); // Titre de la page actuelle

  // ========== État de recherche ==========
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  const [searchResults, setSearchResults] = useState({ // Résultats de recherche
    tasks: [],   // Tâches trouvées
    lists: [],   // Listes trouvées
    tags: [],    // Tags trouvés
    notes: [],   // Notes trouvées
  });

  // ========== Données des tâches ==========
  const [activeTask, setActiveTask] = useState(3); // Tâche active sélectionnée
  const tasks = [ // Liste des tâches prédéfinies
    { name: "Upcoming", icon: <RiArrowRightDoubleFill />, amount: 12 },
    { name: "Today", icon: <FaTasks />, amount: 5 },
    { name: "Calendar", icon: <FaCalendarDays />, amount: 0 },
    { name: "Sticky Wall", icon: <RiStickyNoteFill />, amount: 0 },
  ];

  // ========== Initialisation des données ==========
  // Fonction utilitaire pour charger depuis localStorage
  const loadFromLocalStorage = (key, defaultValue = []) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  // Données des listes
  const [lists, setLists] = useState(() => loadFromLocalStorage("lists"));
  const [activeList, setActiveList] = useState(null); // Liste active sélectionnée

  // Données des tags
  const [tags, setTags] = useState(() => loadFromLocalStorage("tags"));

  // Données des notes
  const [notes, setNotes] = useState(() => loadFromLocalStorage("notes"));

  // Sauvegarde automatique dans localStorage quand les données changent
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ========== Configuration des notes ==========
  const noteColors = [ // Couleurs disponibles pour les notes
    "bg-yellow-200",
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-purple-200",
  ];

  // Couleur par défaut pour les nouvelles notes
  const getDefaultNoteColor = () => "bg-yellow-200";

  // ========== Fonctions utilitaires ==========
  // Basculer l'état du menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Obtenir le nom d'une liste par son ID
  const getListNameById = (listId) => {
    const list = lists.find((l) => l.id === listId);
    return list?.name || "No List";
  };

  // Objet note vide avec valeurs par défaut
  const getEmptyNote = () => ({
    title: "",
    content: "",
    color: getDefaultNoteColor(),
    listId: null,
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // ========== Fonction de recherche ==========
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    // Si le terme est vide, effacer les résultats
    if (!term.trim()) {
      setSearchResults({ tasks: [], lists: [], tags: [], notes: [] });
      return;
    }
  
    const lowerTerm = term.toLowerCase();
  
    // Recherche dans les tâches
    const filteredTasks = tasks.filter(task => 
      task.name.toLowerCase().includes(lowerTerm)
    );
  
    // Recherche dans les listes
    const filteredLists = lists.filter(list => 
      list.name.toLowerCase().includes(lowerTerm)
    );
  
    // Recherche dans les tags
    const filteredTags = tags.filter(tag => 
      tag.name.toLowerCase().includes(lowerTerm)
    );
  
    // Recherche dans les notes (plus complexe)
    const filteredNotes = notes.filter(note => {
      // Recherche dans le titre
      const titleMatch = note.title?.toLowerCase().includes(lowerTerm);
      
      // Recherche dans le contenu (peut être string ou array)
      let contentMatch = false;
      if (typeof note.content === 'string') {
        contentMatch = note.content.toLowerCase().includes(lowerTerm);
      } else if (Array.isArray(note.content)) {
        contentMatch = note.content.some(
          item => typeof item === 'string' && item.toLowerCase().includes(lowerTerm)
        );
      }
      
      // Recherche dans les tags associés
      const tagMatch = note.tags?.some(tagId => {
        const tag = tags.find(t => t.id === tagId);
        return tag?.name.toLowerCase().includes(lowerTerm);
      });
      
      // Recherche dans la liste associée
      const listMatch = lists.some(list => {
        const noteListId = String(note.listId);
        const currentListId = String(list.id);
        return noteListId === currentListId && list.name.toLowerCase().includes(lowerTerm);
      });
      
      return titleMatch || contentMatch || tagMatch || listMatch;
    });
  
    // Mise à jour des résultats
    setSearchResults({
      tasks: filteredTasks,
      lists: filteredLists,
      tags: filteredTags,
      notes: filteredNotes,
    });
  };

  // Effacer la recherche
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults({ tasks: [], lists: [], tags: [], notes: [] });
  };

  // ========== Opérations CRUD ==========
  // Opérations sur les listes
  const handleAddList = (newList) => {
    setLists([...lists, { ...newList, id: Date.now() }]);
  };

  const handleUpdateList = (index, updatedItem) => {
    const updated = [...lists];
    updated[index] = updatedItem;
    setLists(updated);
  };

  const handleDeleteList = (index) => {
    setLists(lists.filter((_, i) => i !== index));
    if (activeList === index) {
      setActiveList(null);
      setPageTitle("");
    }
  };

  // Opérations sur les tags
  const handleAddTag = (newTag) => {
    setTags([...tags, { ...newTag, id: Date.now() }]);
  };

  const handleUpdateTag = (index, updatedTag) => {
    const updated = [...tags];
    updated[index] = updatedTag;
    setTags(updated);
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Basculer un tag (ajout/retrait)
  const toggleTag = (tagId, selectedTags) => {
    return selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
  };

  // Opérations sur les notes
  const handleAddNote = (newNote) => {
    const note = {
      ...getEmptyNote(),
      ...newNote,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes([...notes, note]);
    return note;
  };

  const handleEditNote = (updatedNote) => {
    setNotes(notes.map(note =>
      note.id === updatedNote.id
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // ========== Valeur du contexte ==========
  const value = {
    // État UI
    isMenuOpen,
    toggleMenu,
    pageTitle,
    setPageTitle,

    // Recherche
    searchTerm,
    searchResults,
    handleSearch,
    clearSearch,

    // Tâches
    tasks,
    activeTask,
    setActiveTask,

    // Listes
    lists,
    activeList,
    setActiveList,
    handleAddList,
    handleUpdateList,
    handleDeleteList,
    getListNameById,

    // Tags
    tags,
    handleAddTag,
    handleUpdateTag,
    handleDeleteTag,
    toggleTag,

    // Notes
    notes,
    noteColors,
    getEmptyNote,
    getDefaultNoteColor,
    handleAddNote,
    handleEditNote,
    handleDeleteNote,
  };

  // Fourniture du contexte à l'application
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 3. Hook personnalisé pour accéder facilement au contexte
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};