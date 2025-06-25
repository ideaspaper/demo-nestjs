import { PICBody } from './pic.body.dto';
import { TagBody } from './tag.body.dto';

export class TodoBody {
  id: number;
  title: string;
  tags: TagBody[];
  pic: PICBody;
  finished: boolean;
  deadline: string;
}
