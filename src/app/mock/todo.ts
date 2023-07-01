import { CategoryColor } from "../models/category";
import { Status, Todo } from "../models/todo";

export const TODOLIST: Todo[] = [
  {
    id: 1,
    title: "Complete project proposal",
    body: "Write a detailed project proposal for the upcoming client meeting.",
    status: Status.IS_PROGRESSIVE,
    categoryName: "Work",
    categoryColor: CategoryColor.COLOR_OPTION1
  },
  {
    id: 2,
    title: "Buy groceries",
    body: "Get milk, eggs, bread, and vegetables from the supermarket.",
    status: Status.IS_STARTED,
    categoryName: "Personal",
    categoryColor: CategoryColor.COLOR_OPTION2
  },
  {
    id: 3,
    title: "Call John",
    body: "Discuss the latest project updates and schedule a meeting.",
    status: Status.IS_COMPLETED,
    categoryName: "Work",
    categoryColor: CategoryColor.COLOR_OPTION1
  },
  {
    id: 4,
    title: "Go for a run",
    body: "Run for 30 minutes in the park.",
    status: Status.IS_PROGRESSIVE,
    categoryName: "Health",
    categoryColor: CategoryColor.COLOR_OPTION3
  },
  {
    id: 5,
    title: "Read a book",
    body: "Start reading 'The Power of Now' by Eckhart Tolle.",
    status: Status.IS_STARTED,
    categoryName: "Personal",
    categoryColor: CategoryColor.COLOR_OPTION2
  }
];
