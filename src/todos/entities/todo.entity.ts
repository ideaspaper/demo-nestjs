import { PIC } from './pic.entity';
import { Tag } from './tag.entitiy';

export class Todo {
  id: number;
  title: string;
  tags: Tag[];
  pic: PIC;
  finished: boolean;
  deadline: Date;
}
