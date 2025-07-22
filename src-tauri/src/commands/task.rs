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
    let now = chrono::Utc::now();
    let subtask = Subtask {
        id: uuid::Uuid::new_v4().to_string(),
        task_id: task_id.clone(),
        title,
        is_done: false,
        created_at: now,
        updated_at: now,
    };
    if let Some(task) = store.tasks.iter_mut().find(|t| t.id == task_id) {
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
