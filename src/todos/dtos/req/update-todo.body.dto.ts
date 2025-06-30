import {PartialType} from '@nestjs/mapped-types';
import { CreateTodoBody } from './create-todo.body.dto';

export class UpdateTodoBody extends PartialType(CreateTodoBody) {
  title: string;
  tagIds: number[];
  picId: number;
  finished: boolean;
  deadline: string;
}
