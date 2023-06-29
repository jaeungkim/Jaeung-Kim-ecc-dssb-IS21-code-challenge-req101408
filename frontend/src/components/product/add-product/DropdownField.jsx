const DropdownField = ({
  label,
  id,
  value,
  onChange,
  required,
  error,
  options,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
        {label}:
      </label>
      <div className="relative">
        <select
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            error ? "border-red-500" : ""
          }`}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">Select Repository Link</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default DropdownField;
