import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
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
import { TodoBody } from './dtos/res/todo.body.dto';
import { CreateTodoBody } from './dtos/req/create-todo.body.dto';
import { UpdateTodoBody } from './dtos/req/update-todo.body.dto';
import { PatchTodoFinishedBody } from './dtos/req/patch-todo-finished.body.dto';
import { TodosService } from './todos.service';
import { TodoNotFoundRepositoryException } from './exceptions/todo-not-found.exception.repository';
import { TagNotFoundRepositoryException } from './exceptions/tag-not-found.exception.repository';
import { PicNotFoundRepositoryException } from './exceptions/pic-not-found.exception.repository';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAllTodos(@Query('title') title: string): TodoBody[] {
    try {
      const tds = this.todosService.getAllTodos({
        title,
      });
      return tds.map((td) => ({
        id: td.id,
        title: td.title,
        tags: td.tags,
        pic: td.pic,
        finished: td.finished,
        deadline: Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(td.deadline),
      }));
    } catch {
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
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
  getTodo(@Param('id', ParseIntPipe) id: number): TodoBody {
    try {
      const td = this.todosService.getTodo({ id });
      return {
        id: td.id,
        title: td.title,
        tags: td.tags,
        pic: td.pic,
        finished: td.finished,
        deadline: Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(td.deadline),
      };
    } catch (error) {
      if (error instanceof TodoNotFoundRepositoryException) {
        throw new NotFoundException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Post()
  createTodo(@Body() body: CreateTodoBody): TodoBody {
    try {
      const td = this.todosService.createTodo({
        title: body.title,
        tagIds: body.tagIds,
        picId: body.picId,
        finished: body.finished,
        deadline: new Date(body.deadline),
      });
      return {
        id: td.id,
        title: td.title,
        tags: td.tags,
        pic: td.pic,
        finished: td.finished,
        deadline: Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(td.deadline),
      };
    } catch (error) {
      if (error instanceof TagNotFoundRepositoryException) {
        throw new BadRequestException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      } else if (error instanceof PicNotFoundRepositoryException) {
        throw new BadRequestException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Put('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoBody,
  ): TodoBody {
    try {
      const td = this.todosService.updateTodo({
        id,
        title: body.title,
        tagIds: body.tagIds,
        picId: body.picId,
        finished: body.finished,
        deadline: new Date(body.deadline),
      });
      return {
        id: td.id,
        title: td.title,
        tags: td.tags,
        pic: td.pic,
        finished: td.finished,
        deadline: Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(td.deadline),
      };
    } catch (error) {
      if (error instanceof TodoNotFoundRepositoryException) {
        throw new NotFoundException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.NOT_FOUND,
        });
      } else if (error instanceof TagNotFoundRepositoryException) {
        throw new BadRequestException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      } else if (error instanceof PicNotFoundRepositoryException) {
        throw new BadRequestException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Patch('/:id')
  patchTodoFinished(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchTodoFinishedBody,
  ): TodoBody {
    try {
      const td = this.todosService.patchTodoFinished({
        id,
        finished: body.finished,
      });
      return {
        id: td.id,
        title: td.title,
        tags: td.tags,
        pic: td.pic,
        finished: td.finished,
        deadline: Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(td.deadline),
      };
    } catch (error) {
      if (error instanceof TodoNotFoundRepositoryException) {
        throw new NotFoundException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): TodoBody {
    try {
      const td = this.todosService.deleteTodo({
        id,
      });
      return {
        id: td.id,
        title: td.title,
        tags: td.tags,
        pic: td.pic,
        finished: td.finished,
        deadline: Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(td.deadline),
      };
    } catch (error) {
      if (error instanceof TodoNotFoundRepositoryException) {
        throw new NotFoundException({
          message: error.message,
          error: error.name,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
