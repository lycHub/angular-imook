export interface Task {
  id?: string;
  taskListId: string;
  desc: string;
  completed: boolean;
  ownerId: string;
  participantIds: string[]; // 参与者
  dueDate?: Date;
  priority: number;
  // order: number;
  remark?: string;    // 备注
  // tags?: string[];
  reminder?: Date;
  createDate?: Date;
}
