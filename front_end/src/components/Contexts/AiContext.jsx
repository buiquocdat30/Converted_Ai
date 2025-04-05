import { createContext, useContext, useState, useEffect } from "react";

export const AIContext = createContext({
  aiConfig: {
    provider: "google",
    model: "gemini-1.5-flash",
    apiKey: "",
    translationStyle: "literary",
    preserveFormatting: true,
    translateNames: false,
  },
  updateAIConfig: () => {},
});

export const useAI = () => useContext(AIContext);

export const AIProvider = ({ children }) => {
  const [aiConfig, setAIConfig] = useState({
    provider: "google",
    model: "gemini-1.5-flash",
    apiKey: "",
    translationStyle: "literary", // 'literary', 'natural', 'formal', 'creative'
    preserveFormatting: true,
    translateNames: false,
  });

  // Load config từ localStorage khi khởi động
  useEffect(() => {
    const savedConfig = localStorage.getItem("aiTranslationConfig");
    if (savedConfig) {
      setAIConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Lưu config vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("aiTranslationConfig", JSON.stringify(aiConfig));
  }, [aiConfig]);

  const updateAIConfig = (newConfig) => {
    console.log("Cập nhật config:", newConfig); // Debug tại đây
    setAIConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <AIContext.Provider value={{ aiConfig, updateAIConfig }}>
      {children}
    </AIContext.Provider>
  );
};
