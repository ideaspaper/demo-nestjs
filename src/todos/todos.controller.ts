import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
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
import { CreateTodoBody } from './dtos/req/create-todo.body.dto';
import { UpdateTodoBody } from './dtos/req/update-todo.body.dto';
import { PatchTodoFinishedBody } from './dtos/req/patch-todo-finished.body.dto';
import { RepositoryException } from './exceptions/exception.repository';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { Todo } from './entities/todo.entity';
import { BodyTransformerInterceptor } from 'src/common/interceptors/body-transformer.interceptor';
import { TodosServiceItf } from './todos.service.interface';
import { RequestId } from 'src/common/decorators/request-id.decorator';
import { ConfigService } from 'src/config/config.service';

@UseInterceptors(BodyTransformerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('todos')
export class TodosController {
  constructor(
    @Inject('TodosServiceItf') private todosService: TodosServiceItf,
    private configService: ConfigService,
  ) {}

  @Get()
  getAllTodos(
    @RequestId() requestId: string,
    @Query('title') title: string,
  ): Todo[] {
    console.log('controller can access request id:', requestId);
    console.log('controller can access config service:', this.configService.get('API_KEY'));
    try {
      const tds = this.todosService.getAllTodos({
        title,
      });
      return tds;
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
  getTodo(@Param('id', ParseIntPipe) id: number): Todo {
    try {
      const td = this.todosService.getTodo({ id });
      return td;
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
  createTodo(@Body() body: CreateTodoBody): Todo {
    try {
      const td = this.todosService.createTodo({
        title: body.title,
        tagIds: body.tagIds,
        picId: body.picId,
        finished: body.finished,
        deadline: new Date(body.deadline),
      });
      return td;
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
  ): Todo {
    try {
      const td = this.todosService.updateTodo({
        id,
        title: body.title,
        tagIds: body.tagIds,
        picId: body.picId,
        finished: body.finished,
        deadline: new Date(body.deadline),
      });
      return td;
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
  ): Todo {
    try {
      const td = this.todosService.patchTodoFinished({
        id,
        finished: body.finished,
      });
      return td;
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
  deleteTodo(@Param('id', ParseIntPipe) id: number): Todo {
    try {
      const td = this.todosService.deleteTodo({
        id,
      });
      return td;
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
