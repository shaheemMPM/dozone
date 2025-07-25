pub mod commands;
pub mod controller;
pub mod model;
pub mod storage;

use crate::controller::state::AppState;
use crate::controller::task_controller::TaskStore;
use tauri::Manager;

use commands::task::*;
use commands::window::*;

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
            get_all_tasks,
            create_task,
            update_task,
            move_task,
            delete_task,
            add_subtask,
            update_subtask,
            move_subtask,
            remove_subtask
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
