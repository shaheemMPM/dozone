use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Board {
    pub id: String,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Subtask {
    pub id: String,
    pub task_id: String,
    pub title: String,
    pub is_done: bool,
    pub order: usize,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub board_id: String,
    pub title: String,
    pub notes: Option<String>,
    pub section: String,
    pub order: usize,
    pub subtasks: Vec<Subtask>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
