import { invoke } from "@tauri-apps/api/core";

const FocusWindow = () => {
  const backToPamphlet = async () => {
    await invoke("show_window", { label: "pamphlet" });
    await invoke("hide_window", { label: "focus" });
  };

  return (
    <div className="main-wrapper">
      <h1>Focus Screen – Minimal</h1>
      <button type="button" onClick={backToPamphlet}>
        Back to Pamphlet View
      </button>
    </div>
  );
};

export default FocusWindow;
