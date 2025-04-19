const Spinner = ({ size = '8', color = 'blue-500' }) => {
  const spinnerSize = `h-${size} w-${size}`;
  const spinnerColor = `border-${color}`;
  return (
    <div className="flex justify-center py-4">
      <div className={`animate-spin rounded-full ${spinnerSize} border-t-2 ${spinnerColor}`}></div>
    </div>
  );
};
export default Spinner
