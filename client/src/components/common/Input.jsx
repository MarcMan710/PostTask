const Input = ({ label, className = '', ...props }) => {
  const inputClassName = `w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${className}`;
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <input className={inputClassName} {...props} />
    </div>
  );
};

export default Input
