import { getCurrentWindow } from "@tauri-apps/api/window";
import FocusWindow from "./windows/FocusWindow";
import MainWindow from "./windows/MainWindow";
import PamphletWindow from "./windows/PamphletWindow";

const App = () => {
  const label = getCurrentWindow().label;

  if (!label) return null;

  switch (label) {
    case "main":
      return <MainWindow />;
    case "pamphlet":
      return <PamphletWindow />;
    case "focus":
      return <FocusWindow />;
    default:
      return <MainWindow />;
  }
};

export default App;
