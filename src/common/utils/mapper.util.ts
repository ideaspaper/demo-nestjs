import { plainToInstance } from 'class-transformer';

export function mapEntityToDto<Dto, Entity>(
  dtoClass: new (...args: any[]) => Dto,
  entity: Entity,
): Dto {
  // The `excludeExtraneousValues` option is set to true, meaning only
  // properties decorated with @Expose() in the DTO class will be included in
  // the transformation.
  return plainToInstance(dtoClass, entity, { excludeExtraneousValues: true });
}
