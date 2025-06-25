import { Injectable } from '@nestjs/common';
import { PIC } from './entities/pic.entity';
import { Tag } from './entities/tag.entitiy';
import { Todo } from './entities/todo.entity';
import { TodoNotFoundRepositoryException } from './exceptions/todo-not-found.exception.repository';
import { TagNotFoundRepositoryException } from './exceptions/tag-not-found.exception.repository';
import { PicNotFoundRepositoryException } from './exceptions/pic-not-found.exception.repository';
import {
  CreateTodoParam,
  DeleteTodoParam,
  GetAllTodosParam,
  GetTodoParam,
  PatchTodoFinishedParam,
  TodosRepositoryItf,
  UpdateTodoParam,
} from './todos.repository.interface';

@Injectable()
export class TodosRepository implements TodosRepositoryItf {
  private readonly tags: Tag[] = [
    { id: 1, name: 'procurement' },
    { id: 2, name: 'office supply' },
    { id: 3, name: 'advertisement' },
    { id: 4, name: 'meeting' },
  ];

  private readonly pics: PIC[] = [
    { id: 1, name: 'Chyntia' },
    { id: 2, name: 'John' },
  ];

  private readonly todos: Todo[] = [
    {
      id: 1,
      title: 'prepare the launching of new product',
      tags: [this.tags[0], this.tags[2]],
      pic: this.pics[0],
      deadline: new Date(),
      finished: false,
    },
    {
      id: 2,
      title: 'hold discussion about the upcoming product features',
      tags: [this.tags[3]],
      pic: this.pics[1],
      deadline: new Date(),
      finished: false,
    },
  ];

  getAllTodos(param: GetAllTodosParam): Todo[] {
    let tds = this.todos;
    if (param.title) tds = tds.filter((td) => td.title.includes(param.title));
    return tds;
  }

  getTodo(param: GetTodoParam): Todo {
    const td = this.todos.find((t) => t.id === param.id);
    if (!td) throw new TodoNotFoundRepositoryException();
    return td;
  }

  createTodo(param: CreateTodoParam): Todo {
    const tgs = this.tags.filter((t) => param.tagIds.includes(t.id) && t);
    if (!tgs.length) throw new TagNotFoundRepositoryException();

    const p = this.pics.find((p) => p.id === param.picId);
    if (!p) throw new PicNotFoundRepositoryException();

    const newTd: Todo = {
      id: this.todos[this.todos.length - 1].id + 1,
      title: param.title,
      tags: tgs,
      pic: p,
      finished: param.finished,
      deadline: param.deadline,
    };
    this.todos.push(newTd);

    return newTd;
  }

  updateTodo(param: UpdateTodoParam): Todo {
    const td = this.todos.find((t) => t.id === param.id);
    if (!td) throw new TodoNotFoundRepositoryException();

    const tgs = this.tags.filter((t) => param.tagIds.includes(t.id) && t);
    if (!tgs.length) throw new TagNotFoundRepositoryException();

    const p = this.pics.find((p) => p.id === param.picId);
    if (!p) throw new PicNotFoundRepositoryException();

    td.title = param.title;
    td.tags = tgs;
    td.pic = p;
    td.finished = param.finished;
    td.deadline = param.deadline;

    return td;
  }

  patchTodoFinished(param: PatchTodoFinishedParam): Todo {
    const td = this.todos.find((t) => t.id === param.id);
    if (!td) throw new TodoNotFoundRepositoryException();

    td.finished = param.finished;

    return td;
  }

  deleteTodo(param: DeleteTodoParam): Todo {
    const tdIdx = this.todos.findIndex((t) => t.id === param.id);
    if (tdIdx === -1) throw new TodoNotFoundRepositoryException();

    const oldTd = this.todos[tdIdx];
    this.todos.splice(tdIdx, 1);

    return oldTd;
  }
}
