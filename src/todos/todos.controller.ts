import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

class Tag {
  id: number;
  name: string;
}

const tags: Tag[] = [
  { id: 1, name: 'procurement' },
  { id: 2, name: 'office supply' },
  { id: 3, name: 'advertisement' },
  { id: 4, name: 'meeting' },
];

class PIC {
  id: number;
  name: string;
}

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
  getAllTodos() {
    return todos;
  }

  @Get('/:id')
  getTodo(@Param('id', ParseIntPipe) id: number) {
    const td = todos.find((t) => {
      return t.id === id;
    });
    if (!td) {
      throw new NotFoundException({
        message: 'Tidak ketemu',
        code: 1001,
      });
    }
    return td;
  }
}
