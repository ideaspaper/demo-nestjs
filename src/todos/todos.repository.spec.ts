import { Test, TestingModule } from '@nestjs/testing';
import { TodosRepository } from './todos.repository';

describe('Todos', () => {
  let provider: TodosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosRepository],
    }).compile();

    provider = module.get<TodosRepository>(TodosRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
