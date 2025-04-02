import { useState } from 'react';
import SectionHeader from "./components/SectionHeader";
import { useApp } from "../../../data/DataContext";
import { Edit, Delete } from "../../../assets/icons"; // Import des icônes d'édition et de suppression

const Tags = () => {
  const { 
    tags, 
    setTags,
    handleAddTag: contextAddTag, 
    handleUpdateTag: contextUpdateTag, 
    handleDeleteTag: contextDeleteTag 
  } = useApp();

  // Local UI state only
  const [isEditing, setIsEditing] = useState(false);
  const [currentTagIndex, setCurrentTagIndex] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("blue");
  const [error, setError] = useState("");

  // Add new tag
  const onAddTag = () => {
    if (!newTagName.trim()) {
      setError("Tag name cannot be empty");
      return;
    }

    const newTag = {
      id: Date.now(),
      name: newTagName,
      color: newTagColor,
      isActive: false,
    };

    contextAddTag(newTag);
    setNewTagName("");
    setNewTagColor("blue");
    setIsEditing(false);
    setError("");
  };

  // Start editing a tag
  const startEditing = (index) => {
    setCurrentTagIndex(index);
    setIsEditing(true);
    setNewTagName(tags[index].name);
    setNewTagColor(tags[index].color);
    setError("");
  };

  // Update existing tag
  const onUpdateTag = () => {
    if (!newTagName.trim()) {
      setError("Tag name cannot be empty");
      return;
    }

    contextUpdateTag(currentTagIndex, {
      name: newTagName,
      color: newTagColor,
    });

    setIsEditing(false);
    setNewTagName("");
    setNewTagColor("blue");
    setCurrentTagIndex(null);
    setError("");
  };

  // Delete tag
  const onDeleteTag = (index) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      contextDeleteTag(index);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setNewTagName("");
    setNewTagColor("blue");
    setCurrentTagIndex(null);
    setError("");
  };

  // Color options
  const colorOptions = [
    "blue",
    "red",
    "green",
    "yellow",
    "purple",
    "indigo",
    "pink",
  ];

  return (
    <div className="px-4 pb-2 pt-4">
      <SectionHeader title="TAGS" />

      {error && (
        <div className="mb-2 rounded bg-red-100 p-2 text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div key={tag.id} className="group relative">
            <span
              className={`inline-block rounded-md px-3 py-1 text-xs cursor-pointer ${
                tag.isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-opacity-80"
              }`}
              style={
                !tag.isActive
                  ? {
                      backgroundColor: `var(--color-${tag.color}-100)`,
                      color: `var(--color-${tag.color}-800)`,
                    }
                  : {}
              }
            >
              {tag.name}
            </span>
            <div className="absolute -right-1 -top-1 hidden group-hover:block">
              <button
                className="rounded-full bg-white p-0.5 text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing(index);
                }}
              >
                <Edit className="h-3 w-3"/>
              </button>
              <button
                className="ml-1 rounded-full bg-white p-0.5 text-gray-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTag(index);
                }}
              >
                <Delete className="h-3 w-3"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2 rounded-md border border-dashed border-gray-300 p-2">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-1 text-sm"
            placeholder="Tag name"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (currentTagIndex !== null ? onUpdateTag() : onAddTag())
            }
          />
          <div className="flex gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                className={`h-4 w-4 rounded-full bg-${color}-500 ${
                  newTagColor === color
                    ? "ring-2 ring-offset-1 ring-gray-400"
                    : ""
                }`}
                onClick={() => setNewTagColor(color)}
              />
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="rounded-md bg-gray-200 px-2 py-1 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={
                currentTagIndex !== null ? onUpdateTag : onAddTag
              }
              className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white"
            >
              {currentTagIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="rounded-md border border-dashed border-gray-300 px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <span>+ Add Tag</span>
        </button>
      )}
    </div>
  );
};

export default Tags;