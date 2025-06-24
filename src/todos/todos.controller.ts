import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Tag } from './entities/tag.entitiy';
import { PIC } from './entities/pic.entity';
import { CreateTodoBody } from './dtos/req/create-todo.body.dto';
import { UpdateTodoBody } from './dtos/req/update-todo.body.dto';
import { PatchTodoFinishedBody } from './dtos/req/patch-todo-finished.body.dto';

const tags: Tag[] = [
  { id: 1, name: 'procurement' },
  { id: 2, name: 'office supply' },
  { id: 3, name: 'advertisement' },
  { id: 4, name: 'meeting' },
];

const pics: PIC[] = [
  { id: 1, name: 'Chyntia' },
  { id: 2, name: 'John' },
];

class Todo {
  id: number;
  title: string;
  tags: Tag[];
  pic: PIC;
  finished: boolean;
  deadline: Date;
}

const todos: Todo[] = [
  {
    id: 1,
    title: 'prepare the launching of new product',
    tags: [tags[0], tags[2]],
    pic: pics[0],
    deadline: new Date(),
    finished: false,
  },
  {
    id: 2,
    title: 'hold discussion about the upcoming product features',
    tags: [tags[3]],
    pic: pics[1],
    deadline: new Date(),
    finished: false,
  },
];

@Controller('todos')
export class TodosController {
  @Get()
  getAllTodos(@Query('title') title: string): Todo[] {
    let tds = todos;
    if (title) tds = tds.filter((td) => td.title.includes(title));
    return tds;
  }

  @Post('/example')
  example(@Req() req: Request, @Res() res: Response) {
    console.info('req.body', req.body);
    res.json({
      message: 'success',
      statusCode: HttpStatus.OK,
    });
  }

  @Get('/:id')
  getTodo(@Param('id', ParseIntPipe) id: number): Todo {
    const td = todos.find((t) => t.id === id);
    if (!td) {
      throw new NotFoundException({
        message: 'todo not found',
        error: 'resource not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return td;
  }

  @Post()
  createTodo(@Body() body: CreateTodoBody): Todo {
    const tgs = tags.filter((t) => body.tagIds.includes(t.id) && t);
    if (!tgs.length) {
      throw new BadRequestException({
        message: 'tag does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const p = pics.find((p) => p.id === body.picId);
    if (!p) {
      throw new BadRequestException({
        message: 'pic does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const newTd: Todo = {
      id: todos[todos.length - 1].id + 1,
      title: body.title,
      tags: tgs,
      pic: p,
      finished: body.finished,
      deadline: body.deadline,
    };
    todos.push(newTd);

    return newTd;
  }

  @Put('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoBody,
  ): Todo {
    const td = todos.find((t) => t.id === id);
    if (!td) {
      throw new NotFoundException({
        message: 'todo does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const tgs = tags.filter((t) => body.tagIds.includes(t.id) && t);
    if (!tgs.length) {
      throw new BadRequestException({
        message: 'tag does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const p = pics.find((p) => p.id === body.picId);
    if (!p) {
      throw new BadRequestException({
        message: 'pic does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    td.title = body.title;
    td.tags = tgs;
    td.pic = p;
    td.finished = body.finished;
    td.deadline = body.deadline;

    return td;
  }

  @Patch('/:id')
  patchTodoFinished(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchTodoFinishedBody,
  ): Todo {
    const td = todos.find((t) => t.id === id);
    if (!td) {
      throw new NotFoundException({
        message: 'todo does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    td.finished = body.finished;

    return td;
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): Todo {
    const tdIdx = todos.findIndex((t) => t.id === id);
    if (tdIdx === -1) {
      throw new NotFoundException({
        message: 'todo does not exist',
        error: 'resource not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const oldTd = todos[tdIdx];
    todos.splice(tdIdx, 1);

    return oldTd;
  }
}
