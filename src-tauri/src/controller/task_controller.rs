use crate::model::types::{Board, Task};
use crate::storage::json_store;
use std::path::PathBuf;
use tauri::AppHandle;

pub struct TaskStore {
    pub boards: Vec<Board>,
    pub tasks: Vec<Task>,
    pub board_path: PathBuf,
    pub task_path: PathBuf,
}

impl TaskStore {
    pub fn load_or_init(app: &AppHandle) -> Self {
        let path = json_store::get_storage_dir(app);
        let mut boards = json_store::load_boards(&path);
        if boards.is_empty() {
            let now = chrono::Utc::now();
            boards.push(Board {
                id: "default".to_string(),
                name: "Default Board".to_string(),
                created_at: now,
                updated_at: now,
            });
            json_store::save_boards(&path, &boards);
        }

        let tasks = json_store::load_tasks(&path);
        TaskStore {
            boards,
            tasks,
            board_path: path.clone(),
            task_path: path,
        }
    }

    pub fn add_task(&mut self, task: Task) {
        self.tasks.push(task);
        self.persist_tasks();
    }

    pub fn update_task(&mut self, updated: Task) {
        if let Some(t) = self.tasks.iter_mut().find(|t| t.id == updated.id) {
            *t = updated;
            self.persist_tasks();
        }
    }

    pub fn delete_task(&mut self, task_id: &str) {
        self.tasks.retain(|t| t.id != task_id);
        self.persist_tasks();
    }

    pub fn move_task(&mut self, task_id: &str, new_section: String, new_order: usize) {
        if let Some(t) = self.tasks.iter_mut().find(|t| t.id == task_id) {
            t.section = new_section;
            t.order = new_order;
            t.updated_at = chrono::Utc::now();
            self.persist_tasks();
        }
    }

    fn persist_tasks(&self) {
        json_store::save_tasks(&self.task_path, &self.tasks);
    }
}
