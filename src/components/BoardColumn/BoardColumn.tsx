import "./BoardColumn.css";

type Props = {
  title: string;
};

const BoardColumn = ({ title }: Props) => {
  return (
    <div className="board-column">
      <h2 className="column-title">{title}</h2>
      {/* Tasks will go here */}
      <button type="button" className="add-task-button">
        + ADD TASK
      </button>
    </div>
  );
};

export default BoardColumn;
