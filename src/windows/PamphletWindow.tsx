import { invoke } from "@tauri-apps/api/core";

const PamphletWindow = () => {
  const goToFocus = async () => {
    await invoke("show_window", { label: "focus" });
    await invoke("hide_window", { label: "pamphlet" });
  };

  const backToMain = async () => {
    await invoke("show_window", { label: "main" });
    await invoke("hide_window", { label: "pamphlet" });
  };

  return (
    <div className="main-wrapper">
      <h1>Today Screen – Slim Sidebar</h1>
      <button type="button" onClick={goToFocus}>
        Focus Mode
      </button>
      <button type="button" onClick={backToMain}>
        Back to Home
      </button>
    </div>
  );
};

export default PamphletWindow;
