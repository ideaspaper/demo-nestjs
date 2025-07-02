import { Inject, Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import {
  CreateTodoParam,
  DeleteTodoParam,
  GetAllTodosParam,
  GetTodoParam,
  PatchTodoFinishedParam,
  TodosServiceItf,
  UpdateTodoParam,
} from './todos.service.interface';
import { TodosRepositoryItf } from './todos.repository.interface';

@Injectable()
export class TodosService implements TodosServiceItf {
  constructor(
    @Inject('TodosRepositoryItf') private todosRepository: TodosRepositoryItf,
  ) {}

  getAllTodos(param: GetAllTodosParam): Todo[] {
    return this.todosRepository.getAllTodos({
      title: param.title,
    });
  }

  getTodo(param: GetTodoParam): Todo {
    return this.todosRepository.getTodo({
      id: param.id,
    });
  }

  createTodo(param: CreateTodoParam): Todo {
    return this.todosRepository.createTodo({
      title: param.title,
      tagIds: param.tagIds,
      picId: param.picId,
      finished: param.finished,
      deadline: param.deadline,
    });
  }

  updateTodo(param: UpdateTodoParam): Todo {
    return this.todosRepository.updateTodo({
      id: param.id,
      title: param.title,
      tagIds: param.tagIds,
      picId: param.picId,
      finished: param.finished,
      deadline: param.deadline,
    });
  }

  patchTodoFinished(param: PatchTodoFinishedParam): Todo {
    return this.todosRepository.patchTodoFinished({
      id: param.id,
      finished: param.finished,
    });
  }

  deleteTodo(param: DeleteTodoParam): Todo {
    return this.todosRepository.deleteTodo({
      id: param.id,
    });
  }
}
