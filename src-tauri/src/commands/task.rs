use crate::controller::state::AppState;
use crate::model::types::{Subtask, Task};
use tauri::State;

#[tauri::command]
pub fn get_all_tasks(state: State<AppState>) -> Vec<Task> {
    let store = state.task_store.lock().unwrap();
    store.tasks.clone()
}

#[tauri::command]
pub fn create_task(state: State<AppState>, title: String, section: String) {
    let mut store = state.task_store.lock().unwrap();
    let now = chrono::Utc::now();
    let task = Task {
        id: uuid::Uuid::new_v4().to_string(),
        board_id: "default".to_string(),
        title,
        notes: None,
        section,
        order: store.tasks.len(),
        subtasks: Vec::<Subtask>::new(),
        created_at: now,
        updated_at: now,
    };
    store.add_task(task);
}

#[tauri::command]
pub fn update_task(state: State<AppState>, updated: Task) {
    let mut store = state.task_store.lock().unwrap();
    store.update_task(updated);
}

#[tauri::command]
pub fn move_task(state: State<AppState>, task_id: String, new_section: String, new_order: usize) {
    let mut store = state.task_store.lock().unwrap();
    store.move_task(&task_id, new_section, new_order);
}

#[tauri::command]
pub fn delete_task(state: State<AppState>, task_id: String) {
    let mut store = state.task_store.lock().unwrap();
    store.delete_task(&task_id);
}

#[tauri::command]
pub fn add_subtask(state: State<AppState>, task_id: String, title: String) {
    let mut store = state.task_store.lock().unwrap();
    if let Some(task) = store.tasks.iter_mut().find(|t| t.id == task_id) {
        let now = chrono::Utc::now();
        let order = task.subtasks.len();

        let subtask = Subtask {
            id: uuid::Uuid::new_v4().to_string(),
            task_id: task_id.clone(),
            title,
            is_done: false,
            order,
            created_at: now,
            updated_at: now,
        };

        task.subtasks.push(subtask);
        task.updated_at = now;
        store.persist_tasks();
    }
}

#[tauri::command]
pub fn update_subtask(state: State<AppState>, task_id: String, subtask: Subtask) {
    let mut store = state.task_store.lock().unwrap();
    if let Some(task) = store.tasks.iter_mut().find(|t| t.id == task_id) {
        if let Some(existing) = task.subtasks.iter_mut().find(|s| s.id == subtask.id) {
            *existing = subtask;
            task.updated_at = chrono::Utc::now();
            store.persist_tasks();
        }
    }
}

#[tauri::command]
pub fn move_subtask(state: State<AppState>, task_id: String, subtask_id: String, new_order: usize) {
    let mut store = state.task_store.lock().unwrap();
    if let Some(task) = store.tasks.iter_mut().find(|t| t.id == task_id) {
        let index = task.subtasks.iter().position(|s| s.id == subtask_id);
        if let Some(idx) = index {
            let mut subtask = task.subtasks.remove(idx);
            let old_order = subtask.order;

            for s in task.subtasks.iter_mut().filter(|s| s.order > old_order) {
                s.order -= 1;
            }

            for s in task.subtasks.iter_mut().filter(|s| s.order >= new_order) {
                s.order += 1;
            }

            let now = chrono::Utc::now();
            subtask.order = new_order;
            subtask.updated_at = now;
            task.subtasks.push(subtask);
            task.updated_at = now;
            store.persist_tasks();
        }
    }
}

#[tauri::command]
pub fn remove_subtask(state: State<AppState>, task_id: String, subtask_id: String) {
    let mut store = state.task_store.lock().unwrap();
    if let Some(task) = store.tasks.iter_mut().find(|t| t.id == task_id) {
        let original_len = task.subtasks.len();
        task.subtasks.retain(|s| s.id != subtask_id);
        if task.subtasks.len() < original_len {
            task.updated_at = chrono::Utc::now();
            store.persist_tasks();
        }
    }
}
