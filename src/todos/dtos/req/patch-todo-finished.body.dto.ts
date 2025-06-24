import { IsBoolean, IsNotEmpty } from 'class-validator';

export class PatchTodoFinishedBody {
  @IsNotEmpty()
  @IsBoolean()
  finished: boolean;
}
