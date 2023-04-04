export interface TodoModel {
  id: number;
  description: string;
  title: string;
  complete: boolean | null;
  dueDate: Date | null;
}
