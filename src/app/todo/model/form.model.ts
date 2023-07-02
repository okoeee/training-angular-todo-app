import { Status } from "src/app/models/todo";

export interface TodoForm {
  title: string,
  body: string,
  categoryId: number,
  status: Status
}
