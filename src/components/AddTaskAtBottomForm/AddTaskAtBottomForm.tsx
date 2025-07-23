import { useState } from "react";
import "./AddTaskAtBottomForm.css";
import CloseIcon from "../ui/icons/Close";

type Props = {
  onCreate: (title: string, position: "top" | "bottom") => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

const AddTaskAtBottomForm = ({ onCreate, expanded, setExpanded }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate(title.trim(), "bottom");
      setTitle("");
      setExpanded(false);
    }
  };

  const handleCancel = () => {
    setExpanded(false);
    setTitle("");
  };

  if (expanded) {
    return (
      <div className="add-task-bottom-form">
        <button type="button" onClick={handleCancel} className="cancel-button">
          <CloseIcon size={11} color="#666" tooltip="Cancel" /> CANCEL
        </button>
        <div className="input-container">
          <div className="input-label">Title</div>
          <input
            type="text"
            placeholder="Enter task title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-footer">
          <p className="form-subtitle">Add a new task</p>
          <button
            type="button"
            onClick={handleSubmit}
            className="confirm-button"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-task-wrapper">
      <button
        type="button"
        className="add-task-button"
        onClick={() => setExpanded(true)}
      >
        + ADD TASK
      </button>
    </div>
  );
};

export default AddTaskAtBottomForm;
