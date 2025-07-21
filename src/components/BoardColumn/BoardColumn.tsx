import type { Task } from "../../types/Task";
import TaskCard from "../TaskCard/TaskCard";
import "./BoardColumn.css";

type Props = {
  title: string;
  tasks: Task[];
};

const BoardColumn = ({ title, tasks }: Props) => {
  return (
    <div className="board-column">
      <h2 className="column-title">{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} title={task.title} />
        ))}
      </div>
      <button type="button" className="add-task-button">
        + ADD TASK
      </button>
    </div>
  );
};

export default BoardColumn;
