import { Status, Todo } from "../models/todo";

export const TODOLIST: Todo[] = [
  {
    id: 1,
    categoryId: 1,
    title: "Buy groceries",
    body: "Milk, eggs, bread",
    state: Status.IS_COMPLETED,
  },
  {
    id: 2,
    categoryId: 2,
    title: "Finish homework",
    body: "Math assignment",
    state: Status.IS_PROGRESSIVE,
  },
  {
    id: 3,
    categoryId: 1,
    title: "Go to the gym",
    body: "Workout routine",
    state: Status.IS_PROGRESSIVE,
  },
  {
    id: 4,
    categoryId: 3,
    title: "Read a book",
    body: "Sci-fi novel",
    state: Status.IS_STARTED,
  },
  {
    id: 5,
    categoryId: 2,
    title: "Write a blog post",
    body: "Topic: Technology trends",
    state: Status.IS_COMPLETED,
  },
];
