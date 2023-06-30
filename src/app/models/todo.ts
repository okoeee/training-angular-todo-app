export interface Todo {
  id: number,
  categoryId: number,
  title: string,
  body: string,
  state: Status,
}

export enum Status {
  IS_STARTED = 0, // 未着手
  IS_PROGRESSIVE = 1, // 進行中
  IS_COMPLETED = 2 // 完了
}
