import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [
    { provide: 'TodosServiceItf', useClass: TodosService },
    { provide: 'VALUE_1', useValue: process.env.NODE_ENV === 'production' ? { val1: 42, val2: 43 } : { val1: 1, val2: 2 } },
    TodosRepository,
  ],
  exports: [TodosRepository],
})
export class TodosModule {}
