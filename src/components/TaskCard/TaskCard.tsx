import "./TaskCard.css";
import { SECTIONS } from "../../lib/constants";
import { deleteTask, moveTask } from "../../lib/tauri/tasks";
import type { Task } from "../../types/Task";
import ArrowLeftIcon from "../ui/icons/ArrowLeft";
import ArrowRightIcon from "../ui/icons/ArrowRight";
import CheckListIcon from "../ui/icons/CheckList";
import NotesIcon from "../ui/icons/Notes";
import TrashIcon from "../ui/icons/Trash";

type Props = {
  task: Task;
  section: string;
  onTasksUpdated?: () => void;
};

const TaskCard = ({ task, section, onTasksUpdated }: Props) => {
  const currentSectionIndex = SECTIONS.indexOf(section);

  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === SECTIONS.length - 1;

  const handleAddSubTask = () => {
    console.log("Add sub task clicked");
  };

  const handleAddNotes = () => {
    console.log("Add notes clicked");
  };

  const handleMoveLeft = async () => {
    if (isFirstSection) return;

    const targetSection = SECTIONS[currentSectionIndex - 1];
    try {
      await moveTask(task.id, targetSection, 0);
      if (onTasksUpdated) {
        onTasksUpdated();
      }
    } catch (error) {
      console.error("Error moving task left:", error);
    }
  };

  const handleMoveRight = async () => {
    if (isLastSection) return;

    const targetSection = SECTIONS[currentSectionIndex + 1];
    try {
      await moveTask(task.id, targetSection, 0);
      if (onTasksUpdated) {
        onTasksUpdated();
      }
    } catch (error) {
      console.error("Error moving task right:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      if (onTasksUpdated) {
        onTasksUpdated();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task-card">
      <div className="task-title">{task.title}</div>
      <div className="task-actions">
        <button
          type="button"
          className="task-action-button"
          onClick={handleAddSubTask}
          title="Add sub task"
        >
          <CheckListIcon size={14} color="#6B7280" tooltip="Add sub task" />
        </button>
        <button
          type="button"
          className="task-action-button"
          onClick={handleAddNotes}
          title="Add notes"
        >
          <NotesIcon size={14} color="#6B7280" tooltip="Add notes" />
        </button>
        {!isFirstSection && (
          <button
            type="button"
            className="task-action-button"
            onClick={handleMoveLeft}
            title="Move left"
          >
            <ArrowLeftIcon size={14} color="#6B7280" tooltip="Move left" />
          </button>
        )}
        {!isLastSection && (
          <button
            type="button"
            className="task-action-button"
            onClick={handleMoveRight}
            title="Move right"
          >
            <ArrowRightIcon size={14} color="#6B7280" tooltip="Move right" />
          </button>
        )}
        <button
          type="button"
          className="task-action-button"
          onClick={handleDelete}
          title="Delete"
        >
          <TrashIcon size={14} color="#6B7280" tooltip="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
