import { useState } from "react";
import "./AddTaskAtTopForm.css";

type Props = {
  section: string;
  onCreate: (title: string) => void;
};

const AddTaskAtTopForm = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate(title.trim());
      setTitle("");
    }
  };

  return (
    <div className="add-task-top-form">
      <input
        type="text"
        placeholder="Enter task title*"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="form-footer">
        <p className="form-subtitle">Add a new task</p>
        <button type="button" onClick={handleSubmit} className="confirm-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTaskAtTopForm;
