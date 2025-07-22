export type Task = {
  id: string;
  board_id: string;
  title: string;
  notes?: string;
  section: string;
  order: number;
  subtasks: Subtask[];
  created_at: string;
  updated_at: string;
};

export type Subtask = {
  id: string;
  task_id: string;
  title: string;
  is_done: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};
