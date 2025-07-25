import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTodoBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[];

  @IsNotEmpty()
  @IsNumber()
  picId: number;

  @IsNotEmpty()
  @IsBoolean()
  finished: boolean;

  @IsNotEmpty()
  @IsDateString()
  deadline: string;
}
