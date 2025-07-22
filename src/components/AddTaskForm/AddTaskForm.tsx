import { useState } from "react";
import "./AddTaskForm.css";

type Props = {
  section: string;
  onCreate: (title: string) => void;
  onCancel: () => void;
};

const AddTaskForm = ({ onCreate, onCancel }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate(title.trim());
      setTitle("");
    }
  };

  return (
    <div className="add-task-form">
      <input
        type="text"
        placeholder="Enter task title*"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="form-buttons">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="button" onClick={handleSubmit} className="confirm-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
