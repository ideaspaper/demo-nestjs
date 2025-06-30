import { Expose, Type } from 'class-transformer';

export class PICBody {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;
}
