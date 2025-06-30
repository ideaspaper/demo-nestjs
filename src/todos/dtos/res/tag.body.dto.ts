import { Expose, Type } from 'class-transformer';

export class TagBody {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;
}
