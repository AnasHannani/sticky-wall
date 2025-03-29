# 📝 Sticky Wall - Task Management App  

Sticky Wall is a task management application built with React.js and Tailwind CSS. It allows users to create, manage, and organize tasks as interactive sticky notes.

## 🚀 Features  

- 🟢 **Create, Read, Update, Delete (CRUD)** operations for tasks  
- 🎨 **Customizable note colors** for better organization  
- 📂 **Task categories** to organize tasks into lists  
- 🔍 **Search functionality** to quickly find tasks  
- 🏷️ **Tag system** to categorize tasks (e.g., "Urgent", "Work", "Personal")  
- 💾 **LocalStorage persistence** to save tasks between sessions  
- 📱 **Responsive design** for a seamless experience across devices  

## 🛠️ Tech Stack  

- **Frontend:** React 19, Tailwind CSS  
- **State Management:** React Context API  
- **Build Tool:** Vite  
- **Icons:** React Icons  

## 📂 Project Structure  

sticky-wall/ │── 
        src/ │ 
             ├── components/ # Contient les composants principaux de l'application 
             │ │ ├── MainContent/ # Regroupe les composants liés à l'affichage central des tâches 
             │ │ │ ├── AddButton.jsx # Bouton pour ajouter une nouvelle tâche 
             │ │ │ ├── ContentHeader.jsx # En-tête de la section principale 
             │ │ │ ├── MainContent.jsx # Conteneur principal des tâches 
             │ │ │ ├── NoteActions.jsx # Actions sur les tâches (modifier, supprimer) 
             │ │ │ ├── NoteCard.jsx # Carte individuelle pour chaque tâche 
             │ │ │ ├── NoteGrid.jsx # Affichage en grille des notes 
             │ │ │ ├── NoteModal.jsx # Fenêtre modale pour ajouter/modifier une tâche 
             │ │ │ ├── NoteTags.jsx # Gestion des tags d’une note 
             │ │ │ ├── noteUtils.jsx # Fonctions utilitaires pour les tâches 
             │ │ ├── SidePanel/ # Barre latérale pour la recherche, les filtres, ou les catégories 
             │ │ │ ├── sections/ # Sous-dossiers pour organiser les parties de la barre latérale │
             │ │ │ ├── components/ # Composants spécifiques à la barre latérale 
             │ │ │ │ │ ├── Lists.jsx # Affichage des listes de tâches 
             │ │ │ │ │ ├── Tags.jsx # Gestion des tags 
             │ │ │ │ │ ├── Tasks.jsx # Affichage des tâches filtrées 
             │ │ │ ├── Header.jsx # En-tête de la barre latérale 
             │ │ │ ├── SearchBar.jsx # Champ de recherche pour filtrer les tâches 
             │ │ │ ├── SidePanel.jsx # Conteneur principal de la barre latérale 
             │ ├── data/ # Gestion des données 
             │ │ ├── DataContext.jsx # Contexte React pour partager les données (tâches, listes, tags) 
             │ ├── pages/ # Pages de l'application 
             │ │ ├── Home.jsx # Page d'accueil regroupant MainContent et SidePanel 
             │── package.json 
             │── vite.config.js 
             │── README.md

bash
Copy
Edit

## 📦 Installation & Running  

1️⃣ Clone the repository:  
```sh
git clone https://github.com/yourusername/sticky-wall.git
cd sticky-wall
2️⃣ Install dependencies:

sh
Copy
Edit
npm install
3️⃣ Start the development server:

sh
Copy
Edit
npm run dev
4️⃣ Open http://localhost:5173 in your browser.

📝 Future Improvements
🏗️ Drag-and-drop functionality to rearrange notes

☁️ API integration for cloud storage

📅 Due dates and reminders for tasks

📸 Screenshots
(public/screenshot.png)
