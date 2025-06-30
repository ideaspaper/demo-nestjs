import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TodoBody } from './dtos/res/todo.body.dto';
import { CreateTodoBody } from './dtos/req/create-todo.body.dto';
import { UpdateTodoBody } from './dtos/req/update-todo.body.dto';
import { PatchTodoFinishedBody } from './dtos/req/patch-todo-finished.body.dto';
import { TodosService } from './todos.service';
import { RepositoryException } from './exceptions/exception.repository';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { mapEntityToDto } from 'src/common/utils/mapper.util';

@UseInterceptors(ResponseInterceptor)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAllTodos(@Query('title') title: string): TodoBody[] {
    try {
      const tds = this.todosService.getAllTodos({
        title,
      });
      return tds.map((td) => mapEntityToDto(TodoBody, td));
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
      return mapEntityToDto(TodoBody, td);
    } catch (error) {
      if (error instanceof RepositoryException) throw error;
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
      return mapEntityToDto(TodoBody, td);
    } catch (error) {
      if (error instanceof RepositoryException) throw error;
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
      return mapEntityToDto(TodoBody, td);
    } catch (error) {
      if (error instanceof RepositoryException) throw error;
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
      return mapEntityToDto(TodoBody, td);
    } catch (error) {
      if (error instanceof RepositoryException) throw error;
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
      return mapEntityToDto(TodoBody, td);
    } catch (error) {
      if (error instanceof RepositoryException) throw error;
      throw new InternalServerErrorException({
        message: 'something wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
