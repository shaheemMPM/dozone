import BoardColumn from "../../components/BoardColumn/BoardColumn";
import "./MainWindow.css";

const MainWindow = () => {
  return (
    <div className="main-window-wrapper">
      <div className="board-layout">
        <BoardColumn title="Backlog" />
        <BoardColumn title="This Week" />
        <BoardColumn title="Today" />
        <BoardColumn title="Done" />
      </div>
    </div>
  );
};

export default MainWindow;
