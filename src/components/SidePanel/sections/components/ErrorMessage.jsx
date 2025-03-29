const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mb-2 rounded bg-red-100 p-2 text-xs text-red-600">
      {message}
    </div>
  );
};

export default ErrorMessage;