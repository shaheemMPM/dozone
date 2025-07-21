import "./MainWindow.css";

const MainWindow = () => {
  return (
    <div className="main-window-wrapper">
      <div className="board-layout">
        <div className="board-column">
          <h2>Backlog</h2>
        </div>
        <div className="board-column">
          <h2>This Week</h2>
        </div>
        <div className="board-column">
          <h2>Today</h2>
        </div>
        <div className="board-column">
          <h2>Done</h2>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
