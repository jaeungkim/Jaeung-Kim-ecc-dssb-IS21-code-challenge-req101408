import React from 'react';

const ProductSearch = ({ scrumMasterSearchText, setScrumMasterSearchText, developerSearchText, setDeveloperSearchText }) => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search by Scrum Master"
        value={scrumMasterSearchText}
        onChange={(e) => setScrumMasterSearchText(e.target.value)}
        className="border px-2 py-1 rounded-lg mr-2 w-48 sm:w-auto"
      />
      <input
        type="text"
        placeholder="Search by Developer"
        value={developerSearchText}
        onChange={(e) => setDeveloperSearchText(e.target.value)}
        className="border px-2 py-1 rounded-lg w-48 sm:w-auto"
      />
    </div>
  );
};

export default ProductSearch;
