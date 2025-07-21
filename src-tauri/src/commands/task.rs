use crate::controller::state::AppState;
use crate::model::types::Task;
use tauri::State;

#[tauri::command]
pub fn get_all_tasks(state: State<AppState>) -> Vec<Task> {
    let store = state.task_store.lock().unwrap();
    store.tasks.clone()
}

#[tauri::command]
pub fn create_dummy_task(state: State<AppState>) {
    let mut store = state.task_store.lock().unwrap();
    let now = chrono::Utc::now();
    let task = Task {
        id: uuid::Uuid::new_v4().to_string(),
        board_id: "default".to_string(),
        title: "Dummy Task".to_string(),
        notes: Some("This is a dummy task".to_string()),
        section: "today".to_string(),
        order: store.tasks.len(),
        subtasks: vec![],
        created_at: now,
        updated_at: now,
    };
    store.add_task(task);
}
