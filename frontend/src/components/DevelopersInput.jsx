import React, { useState, useEffect } from "react";

const DevelopersInput = ({ developers, setDevelopers }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputDevelopers, setInputDevelopers] = useState([]);

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

    setDevelopers(newDevelopers);
    setInputDevelopers(newDevelopers);
    setInputValue("");
  };

  // Removes a developer from the list
  const removeDeveloper = (developer) => {
    const updatedDevelopers = inputDevelopers.filter(
      (dev) => dev !== developer
    );
    setDevelopers(updatedDevelopers);
    setInputDevelopers(updatedDevelopers);
  };

  // Handles the input field change event
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    const newDevelopers = e.target.value
      .split(",")
      .map((developer) => developer.trim())
      .filter((developer) => developer !== "");

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
          className="flex-grow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
    </div>
  );
};

export default DevelopersInput;
