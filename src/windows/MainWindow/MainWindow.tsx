import BoardColumn, {
  type DummyTask,
} from "../../components/BoardColumn/BoardColumn";
import "./MainWindow.css";

const dummyData: Record<string, DummyTask[]> = {
  Backlog: [
    { id: "1", title: "Sketch homepage layout" },
    { id: "2", title: "Research drag-and-drop libraries" },
  ],
  "This Week": [{ id: "3", title: "Finish MVP routing" }],
  Today: [
    { id: "4", title: "Fix persist bug in TaskStore" },
    { id: "5", title: "Style board columns properly" },
  ],
  Done: [{ id: "6", title: "Add dummy task button" }],
};

const MainWindow = () => {
  return (
    <div className="main-window-wrapper">
      <div className="board-layout">
        {Object.entries(dummyData).map(([section, tasks]) => (
          <BoardColumn key={section} title={section} tasks={tasks} />
        ))}
      </div>
    </div>
  );
};

export default MainWindow;
