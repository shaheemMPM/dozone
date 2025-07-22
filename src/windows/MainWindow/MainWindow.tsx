import { useEffect, useState } from "react";
import BoardColumn from "../../components/BoardColumn/BoardColumn";
import "./MainWindow.css";
import { getAllTasks } from "../../lib/tauri/tasks";
import type { Task } from "../../types/Task";

const MainWindow = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const sections = ["Backlog", "This Week", "Today", "Done"];

  return (
    <div className="main-window-wrapper">
      <div className="board-layout">
        {sections.map((section) => (
          <BoardColumn
            key={section}
            title={section}
            tasks={tasks.filter((t) => t.section === section)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainWindow;
