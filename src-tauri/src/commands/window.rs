use tauri::{AppHandle, Manager};

#[tauri::command]
pub fn show_window(app: AppHandle, label: &str) {
    if let Some(window) = app.get_webview_window(label) {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

#[tauri::command]
pub fn hide_window(app: AppHandle, label: &str) {
    if let Some(window) = app.get_webview_window(label) {
        let _ = window.hide();
    }
}
