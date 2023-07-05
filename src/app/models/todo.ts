import { CategoryColor } from "./category";

export interface Todo {
  id: number,
  title: string,
  body: string,
  status: Status,
  categoryId: number,
  categoryName: string,
  categoryColor: CategoryColor
}

/**
 * @IS_STARTED 0, 未着手
 * @IS_PROGRESSIVE 1, 進行中
 * @IS_COMPLETED 2, 完了
 */
export enum Status {
  IS_STARTED = 0,
  IS_PROGRESSIVE = 1,
  IS_COMPLETED = 2
}
