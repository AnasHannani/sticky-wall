
function NoteTags({ tagIds = [], allTags = [] }) {
  const getTagById = (id) => allTags.find(tag => tag.id === id);

  return (
    <div className="flex flex-wrap gap-1">
      {tagIds.map(tagId => {
        const tag = getTagById(tagId);
        if (!tag) return null;
        
        return (
          <span 
            key={tagId}
            className={`px-2 py-1 text-xs rounded-full ${tag.color || 'bg-gray-200'} text-white`}
          >
            {tag.name}
          </span>
        );
      })}
    </div>
  );
}

export default NoteTags;