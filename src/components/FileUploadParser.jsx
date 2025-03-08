import React, { useState } from "react";

const FileUploadParser = ({ onFileParse }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleParseCSV = () => {
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      try {
        const rows = result
          .split("\n")
          .map((row) => row.trim())
          .filter(Boolean);
        if (rows.length < 2) throw new Error("CSV file is empty or invalid.");

        const headers = rows[0].split(",").map((header) => header.trim());
        const data = rows.slice(1).map((row) => {
          const values = row.split(",").map((value) => value.trim());
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || "";
            return acc;
          }, {});
        });

        onFileParse(data);
      } catch (error) {
        alert(error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <label className="block mb-1 mt-3 font-medium">Upload Variants</label>
      <div className="flex m-2">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full file-input file-input-primary"
        />
        <button
          type="button"
          onClick={handleParseCSV}
          className="p-2 bg-yellow-500 text-white w-full rounded-md shadow-md hover:bg-yellow-600">
          Parse CSV
        </button>
      </div>
    </>
  );
};

export default FileUploadParser;
