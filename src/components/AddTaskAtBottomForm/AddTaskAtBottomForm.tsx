import { useState } from "react";
import "./AddTaskAtBottomForm.css";

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

  return (
    <div className="add-task-bottom-container">
      {!expanded ? (
        <div className="add-task-wrapper">
          <button
            type="button"
            className="add-task-button"
            onClick={() => setExpanded(true)}
          >
            + ADD TASK
          </button>
        </div>
      ) : (
        <div className="add-task-bottom-form">
          <input
            type="text"
            placeholder="Enter task title*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="form-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="confirm-button"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskAtBottomForm;
