import React, { createContext, useState } from "react";

// Tạo context
export const FileContext = createContext({
  selectedFile: null,
  setSelectedFile: () => {},
});

// Tạo Provider component
export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </FileContext.Provider>
  );
};
