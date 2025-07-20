pub mod controller;
pub mod model;
pub mod storage;

use crate::controller::state::AppState;
use crate::controller::task_controller::TaskStore;
use tauri::Manager;

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

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let store = TaskStore::load_or_init(&app.app_handle());
            app.manage(AppState {
                task_store: std::sync::Mutex::new(store),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![show_window, hide_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
