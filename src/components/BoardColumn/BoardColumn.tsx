import { useState } from "react";
import type { Task } from "../../types/Task";
import AddTaskAtTopForm from "../AddTaskAtTopForm/AddTaskAtTopForm";
import TaskCard from "../TaskCard/TaskCard";
import "./BoardColumn.css";
import checkmarkIcon from "../../assets/svgs/check-square.svg";
import { createTask } from "../../lib/tauri/tasks";
import AddTaskAtBottomForm from "../AddTaskAtBottomForm/AddTaskAtBottomForm";

type Props = {
  title: string;
  tasks: Task[];
};

const BoardColumn = ({ title, tasks }: Props) => {
  const [showTopForm, setShowTopForm] = useState(false);
  const [isBottomFormExpanded, setIsBottomFormExpanded] = useState(false);

  const handleAdd = async (titleText: string, position: "top" | "bottom") => {
    await createTask(titleText, title, position); // section = title
    setShowTopForm(false);
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <button
          type="button"
          className="icon-button"
          onClick={() => setShowTopForm((v) => !v)}
        >
          {showTopForm ? "×" : "+"}
        </button>
      </div>

      {showTopForm && <AddTaskAtTopForm section={title} onCreate={handleAdd} />}

      {tasks.length > 0 && (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} title={task.title} />
          ))}
        </div>
      )}

      {!showTopForm && (
        <AddTaskAtBottomForm
          onCreate={handleAdd}
          expanded={isBottomFormExpanded}
          setExpanded={setIsBottomFormExpanded}
        />
      )}

      {tasks.length === 0 && !showTopForm && !isBottomFormExpanded && (
        <div className="all-clear">
          <img src={checkmarkIcon} alt="Checkmark" className="checkmark-icon" />
          <span>All Clear</span>
        </div>
      )}
    </div>
  );
};

export default BoardColumn;
