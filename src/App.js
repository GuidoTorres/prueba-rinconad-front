import "./App.css";
import { CrudProvider } from "./context/CrudContext";
import { PlanillaProvider } from "./context/PlanillaContext";

import MainPage from "./pages/MainPage";
function App() {
  return (
    <CrudProvider>
      <PlanillaProvider>
        <div className="App">
          <MainPage />
        </div>
      </PlanillaProvider>
    </CrudProvider>
  );
}

export default App;
