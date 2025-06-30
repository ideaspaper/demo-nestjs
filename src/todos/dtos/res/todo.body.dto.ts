import { Expose, Transform, Type } from 'class-transformer';
import { PICBody } from './pic.body.dto';
import { TagBody } from './tag.body.dto';

export class TodoBody {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  title: string;

  @Expose()
  @Type(() => TagBody)
  tags: TagBody[];

  @Expose()
  @Type(() => PICBody)
  pic: PICBody;

  @Expose()
  @Type(() => Boolean)
  finished: boolean;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => {
    return Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(value as Date);
  })
  deadline: string;
}
