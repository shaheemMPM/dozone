import { invoke } from "@tauri-apps/api/core";

const MainWindow = () => {
  const goToPamphlet = async () => {
    await invoke("show_window", { label: "pamphlet" });
    await invoke("hide_window", { label: "main" });
  };

  const createDummyTask = async () => {
    await invoke("create_dummy_task");
  };

  return (
    <div className="main-wrapper">
      <h1>Main Screen – Board View</h1>
      <button type="button" onClick={goToPamphlet}>
        Go to Pamphlet View
      </button>
      <button type="button" onClick={createDummyTask}>
        ➕ Add Dummy Task
      </button>
    </div>
  );
};

export default MainWindow;
