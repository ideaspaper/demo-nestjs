import { Todo } from './entities/todo.entity';

export interface TodosServiceItf {
  getAllTodos(param: GetAllTodosParam): Todo[];
  getTodo(param: GetTodoParam): Todo;
  createTodo(param: CreateTodoParam): Todo;
  updateTodo(param: UpdateTodoParam): Todo;
  patchTodoFinished(param: PatchTodoFinishedParam): Todo;
  deleteTodo(param: DeleteTodoParam): Todo;
}

export type GetAllTodosParam = {
  title: string;
};

export type GetTodoParam = {
  id: number;
};

export type CreateTodoParam = {
  title: string;
  tagIds: number[];
  picId: number;
  finished: boolean;
  deadline: Date;
};

export type UpdateTodoParam = {
  id: number;
  title: string;
  tagIds: number[];
  picId: number;
  finished: boolean;
  deadline: Date;
};

export type PatchTodoFinishedParam = {
  id: number;
  finished: boolean;
};

export type DeleteTodoParam = {
  id: number;
};
