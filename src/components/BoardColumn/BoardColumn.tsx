import { useState } from "react";
import type { Task } from "../../types/Task";
import AddTaskAtTopForm from "../AddTaskAtTopForm/AddTaskAtTopForm";
import TaskCard from "../TaskCard/TaskCard";
import "./BoardColumn.css";
import checkmarkIcon from "../../assets/svgs/check-square.svg";
import { createTask } from "../../lib/tauri/tasks";
import { hideWindow, showWindow } from "../../lib/tauri/windows";
import AddTaskAtBottomForm from "../AddTaskAtBottomForm/AddTaskAtBottomForm";

type Props = {
  title: string;
  tasks: Task[];
  onTasksUpdated?: () => void;
};

const BoardColumn = ({ title, tasks, onTasksUpdated }: Props) => {
  const [showTopForm, setShowTopForm] = useState(false);
  const [isBottomFormExpanded, setIsBottomFormExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

  const handleAdd = async (
    titleText: string,
    position: "top" | "bottom" = "bottom",
  ) => {
    setIsRefreshing(true);
    try {
      await createTask(titleText, title, position); // section = title
      setShowTopForm(false);
      setIsBottomFormExpanded(false);

      if (onTasksUpdated) {
        onTasksUpdated();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleStartDay = async () => {
    try {
      await showWindow("pamphlet");
      await hideWindow("main");
    } catch (error) {
      console.error("Error starting day:", error);
    }
  };

  const isTodayColumn = title === "Today";

  return (
    <div className={`board-column ${isTodayColumn ? "today-column" : ""}`}>
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

      <div className="scroll-container">
        {sortedTasks.length > 0 && (
          <div className="task-list">
            {isRefreshing ? (
              <div className="loading-indicator">Refreshing tasks...</div>
            ) : (
              sortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  section={title}
                  onTasksUpdated={onTasksUpdated}
                />
              ))
            )}
          </div>
        )}

        {!showTopForm && (
          <AddTaskAtBottomForm
            onCreate={handleAdd}
            expanded={isBottomFormExpanded}
            setExpanded={setIsBottomFormExpanded}
          />
        )}
      </div>

      {sortedTasks.length === 0 &&
        !showTopForm &&
        !isBottomFormExpanded &&
        !isRefreshing && (
          <div className="all-clear">
            <img
              src={checkmarkIcon}
              alt="Checkmark"
              className="checkmark-icon"
            />
            <span>All Clear</span>
          </div>
        )}

      {isTodayColumn && (
        <div className="start-day-container">
          <button
            type="button"
            className="start-day-button"
            onClick={handleStartDay}
          >
            Start Today
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardColumn;
