import StepperAi from "./components/StepperAi/StepperAi.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { FileProvider } from "./components/Contexts/FileContext.jsx";
import { AIProvider } from "./components/Contexts/AiContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FileProvider>
        <AIProvider>
          <StepperAi />
          <Footer />
        </AIProvider>
      </FileProvider>
    </div>
  );
}

export default App;
