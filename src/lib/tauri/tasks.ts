import { invoke } from "@tauri-apps/api/core";
import type { Subtask, Task } from "../../types/Task";

// -- TASK COMMANDS --

export const getAllTasks = async (): Promise<Task[]> => {
  return invoke("get_all_tasks");
};

export const createTask = async (
  title: string,
  section: string,
): Promise<void> => {
  return invoke("create_task", { title, section });
};

export const updateTask = async (task: Task): Promise<void> => {
  return invoke("update_task", { updated: task });
};

export const moveTask = async (
  taskId: string,
  newSection: string,
  newOrder: number,
): Promise<void> => {
  return invoke("move_task", {
    taskId,
    newSection,
    newOrder,
  });
};

export const deleteTask = async (taskId: string): Promise<void> => {
  return invoke("delete_task", { taskId });
};

// -- SUBTASK COMMANDS --

export const addSubtask = async (
  taskId: string,
  title: string,
): Promise<void> => {
  return invoke("add_subtask", { taskId, title });
};

export const updateSubtask = async (
  taskId: string,
  subtask: Subtask,
): Promise<void> => {
  return invoke("update_subtask", { taskId, subtask });
};

export const moveSubtask = async (
  taskId: string,
  subtaskId: string,
  newOrder: number,
): Promise<void> => {
  return invoke("move_subtask", { taskId, subtaskId, newOrder });
};

export const removeSubtask = async (
  taskId: string,
  subtaskId: string,
): Promise<void> => {
  return invoke("remove_subtask", { taskId, subtaskId });
};
