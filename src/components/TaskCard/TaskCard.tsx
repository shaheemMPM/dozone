import "./TaskCard.css";

type Props = {
  title: string;
};

const TaskCard = ({ title }: Props) => {
  return (
    <div className="task-card">
      <div className="task-title">{title}</div>
    </div>
  );
};

export default TaskCard;
