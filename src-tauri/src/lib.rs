pub mod controller;
pub mod model;
pub mod storage;

use crate::controller::state::AppState;
use crate::controller::task_controller::TaskStore;
use crate::model::types::Task;
use tauri::{Manager, State};

#[tauri::command]
fn show_window(app: tauri::AppHandle, label: &str) {
    if let Some(window) = app.get_webview_window(label) {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

#[tauri::command]
fn hide_window(app: tauri::AppHandle, label: &str) {
    if let Some(window) = app.get_webview_window(label) {
        let _ = window.hide();
    }
}

#[tauri::command]
fn create_dummy_task(state: State<AppState>) {
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

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let store = TaskStore::load_or_init(&app.app_handle());
            app.manage(AppState {
                task_store: std::sync::Mutex::new(store),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            show_window,
            hide_window,
            create_dummy_task
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
