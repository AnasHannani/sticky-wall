

function ContentHeader({ title }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

export default ContentHeader;