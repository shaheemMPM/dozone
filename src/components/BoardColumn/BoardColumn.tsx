import { useState } from "react";
import type { Task } from "../../types/Task";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import TaskCard from "../TaskCard/TaskCard";
import "./BoardColumn.css";
import checkmarkIcon from "../../assets/svgs/check-square.svg";
import { createTask } from "../../lib/tauri/tasks";

type Props = {
  title: string;
  tasks: Task[];
};

const BoardColumn = ({ title, tasks }: Props) => {
  const [showTopForm, setShowTopForm] = useState(false);
  const [showBottomForm, setShowBottomForm] = useState(false);

  const handleAdd = async (titleText: string) => {
    await createTask(titleText, title); // section = title
    setShowTopForm(false);
    setShowBottomForm(false);
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

      {showTopForm && (
        <AddTaskForm
          section={title}
          onCreate={handleAdd}
          onCancel={() => setShowTopForm(false)}
        />
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="all-clear">
            <img
              src={checkmarkIcon}
              alt="Checkmark"
              className="checkmark-icon"
            />
            <span>All Clear</span>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} title={task.title} />)
        )}
      </div>

      {showBottomForm ? (
        <AddTaskForm
          section={title}
          onCreate={handleAdd}
          onCancel={() => setShowBottomForm(false)}
        />
      ) : (
        <button
          type="button"
          className="add-task-button"
          onClick={() => setShowBottomForm(true)}
        >
          + ADD TASK
        </button>
      )}
    </div>
  );
};

export default BoardColumn;
