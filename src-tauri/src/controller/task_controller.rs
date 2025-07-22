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
        // Step 1: find and remove the task
        let task_index = self.tasks.iter().position(|t| t.id == task_id);
        if task_index.is_none() {
            return;
        }
        let mut task = self.tasks.remove(task_index.unwrap());

        let old_section = task.section.clone();
        let old_order = task.order;

        // Step 2: update ordering in old section
        for t in self
            .tasks
            .iter_mut()
            .filter(|t| t.section == old_section && t.order > old_order)
        {
            t.order -= 1;
        }

        // Step 3: update ordering in new section
        for t in self
            .tasks
            .iter_mut()
            .filter(|t| t.section == new_section && t.order >= new_order)
        {
            t.order += 1;
        }

        // Step 4: update and reinsert task
        task.section = new_section;
        task.order = new_order;
        task.updated_at = chrono::Utc::now();
        self.tasks.push(task);

        // Step 5: persist
        self.persist_tasks();
    }

    pub fn persist_tasks(&self) {
        json_store::save_tasks(&self.task_path, &self.tasks);
    }
}
