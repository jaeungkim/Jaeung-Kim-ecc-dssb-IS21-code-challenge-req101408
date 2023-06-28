import React, { useState, useEffect } from "react";

const MAX_DEVELOPERS = 5; // Define max developers here

const DevelopersInput = ({ developers, setDevelopers, handleError }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputDevelopers, setInputDevelopers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInputDevelopers(developers);
    setInputValue(developers.join(", "));
  }, [developers]);

  // Adds developers to the list
  const addDevelopers = () => {
    const newDevelopers = inputValue
      .split(",")
      .map((developer) => developer.trim())
      .filter((developer) => developer !== "");

    if (newDevelopers.length > MAX_DEVELOPERS) {
      setError(`Only up to ${MAX_DEVELOPERS} developers allowed.`);
      return;
    } else {
      setError(null);
      setDevelopers(newDevelopers);
      setInputDevelopers(newDevelopers);
      setInputValue("");
    }
  };

  // Removes a developer from the list
  const removeDeveloper = (developer) => {
    const updatedDevelopers = inputDevelopers.filter(
      (dev) => dev !== developer
    );
    setDevelopers(updatedDevelopers);
    setInputDevelopers(updatedDevelopers);

    // Clear the error if the updated list of developers has less than or equal to the max limit
    if (updatedDevelopers.length <= MAX_DEVELOPERS) {
      setError(null);
    }
  };

  // Handles the input field change event
  const handleInputChange = (e) => {
    const newDevelopers = e.target.value
      .split(",")
      .map((developer) => developer.trim())
      .filter((developer) => developer !== "");

    if (newDevelopers.length > MAX_DEVELOPERS) {
      setError(`Only up to ${MAX_DEVELOPERS} developers allowed.`);
      handleError(true);
    } else {
      setError(null);
      handleError(false);
    }
    setInputValue(e.target.value);
    setInputDevelopers(newDevelopers);
  };

  return (
    <div>
      <label
        htmlFor="developers"
        className="block mt-2 text-sm font-medium text-gray-700"
      >
        Developers
      </label>
      <div className="flex flex-wrap gap-2 mt-1">
        <input
          type="text"
          id="developers"
          name="developers"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={addDevelopers}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        {inputDevelopers.map((developer) => (
          <div
            key={developer}
            className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-md"
          >
            <span className="mr-1">{developer}</span>
            <button
              type="button"
              onClick={() => removeDeveloper(developer)}
              className="ml-1 text-red-600 focus:outline-none"
            >
              X
            </button>
          </div>
        ))}
      </div>
      {error && (
        <div className="text-red-500">
          You can only enter up to 5 developers.
        </div>
      )}
    </div>
  );
};

export default DevelopersInput;
