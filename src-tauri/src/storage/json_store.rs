use crate::model::types::{Board, Task};
use serde_json;
use std::fs::{create_dir_all, read_to_string, write};
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Manager};

pub fn get_storage_dir(app: &AppHandle) -> PathBuf {
    let app_dir = app
        .path()
        .app_config_dir()
        .or_else(|_| app.path().app_local_data_dir())
        .expect("Failed to resolve app directory");

    let path = app_dir.join("json_db");
    create_dir_all(&path).expect("Failed to create app storage directory");
    path
}

pub fn load_boards(path: &Path) -> Vec<Board> {
    let path = path.join("boards.json");
    if !path.exists() {
        return Vec::new();
    }
    let content = read_to_string(path).unwrap_or_default();
    serde_json::from_str(&content).unwrap_or_default()
}

pub fn save_boards(path: &Path, boards: &Vec<Board>) {
    let path = path.join("boards.json");
    let json = serde_json::to_string_pretty(boards).expect("Failed to serialize boards");
    write(path, json).expect("Failed to write boards.json");
}

pub fn load_tasks(path: &Path) -> Vec<Task> {
    let path = path.join("tasks.json");
    if !path.exists() {
        return Vec::new();
    }
    let content = read_to_string(path).unwrap_or_default();
    serde_json::from_str(&content).unwrap_or_default()
}

pub fn save_tasks(path: &Path, tasks: &Vec<Task>) {
    let path = path.join("tasks.json");
    let json = serde_json::to_string_pretty(tasks).expect("Failed to serialize tasks");
    write(path, json).expect("Failed to write tasks.json");
}
