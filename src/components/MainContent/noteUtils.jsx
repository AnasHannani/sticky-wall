// Utility functions for note operations
export const getListName = (lists, listId) => {
  const list = lists.find(list => list.id === listId);
  return list ? list.name : '';
};

export const getTagNames = (tags, tagIds) => {
  return tagIds
    .map(tagId => {
      const tag = tags.find(tag => tag.id === tagId);
      return tag ? tag.name : '';
    })
    .filter(Boolean);
};

export const getColorClass = (color) => {
  const colorMap = {
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    cyan: 'bg-cyan-100',
    orange: 'bg-orange-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100'
  };
  return colorMap[color] || 'bg-yellow-100';
};