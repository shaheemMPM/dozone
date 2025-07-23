import "./TaskCard.css";
import ArrowLeftIcon from "../ui/icons/ArrowLeft";
import ArrowRightIcon from "../ui/icons/ArrowRight";
import CheckListIcon from "../ui/icons/CheckList";
import NotesIcon from "../ui/icons/Notes";
import TrashIcon from "../ui/icons/Trash";

type Props = {
  title: string;
};

const TaskCard = ({ title }: Props) => {
  const handleAddSubTask = () => {
    console.log("Add sub task clicked");
  };

  const handleAddNotes = () => {
    console.log("Add notes clicked");
  };

  const handleMoveLeft = () => {
    console.log("Move left clicked");
  };

  const handleMoveRight = () => {
    console.log("Move right clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <div className="task-card">
      <div className="task-title">{title}</div>
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
        <button
          type="button"
          className="task-action-button"
          onClick={handleMoveLeft}
          title="Move left"
        >
          <ArrowLeftIcon size={14} color="#6B7280" tooltip="Move left" />
        </button>
        <button
          type="button"
          className="task-action-button"
          onClick={handleMoveRight}
          title="Move right"
        >
          <ArrowRightIcon size={14} color="#6B7280" tooltip="Move right" />
        </button>
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
