import { invoke } from "@tauri-apps/api/core";

export const showWindow = async (label: string): Promise<void> => {
  await invoke("show_window", { label });
};

export const hideWindow = async (label: string): Promise<void> => {
  await invoke("hide_window", { label });
};
