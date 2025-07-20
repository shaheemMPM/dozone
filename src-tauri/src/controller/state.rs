use crate::controller::task_controller::TaskStore;
use std::sync::Mutex;

pub struct AppState {
    pub task_store: Mutex<TaskStore>,
}
