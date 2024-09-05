import { useAssistantStore } from "@sk-web-gui/ai";
import { GuiProvider } from "@sk-web-gui/react";
import { Suspense, useEffect } from "react";
import "./App.css";
import { Main } from "./views/Main";
import { LoadingScreen } from "./components/loading-screen/loading-screen.component";

function App() {
  const { setSettings } = useAssistantStore();

  useEffect(() => {
    setSettings({
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      assistantId: "",
    });
  }, [setSettings]);

  return (
    <GuiProvider>
      <Suspense fallback={<LoadingScreen />}>
        <Main />
      </Suspense>
    </GuiProvider>
  );
}

export default App;
