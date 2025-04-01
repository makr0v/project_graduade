import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { Constructable } from '../types';

export function validateClass(classSchema: Constructable) {
  return (config: Record<string, unknown>) => {
    const validatedConfig: object = plainToInstance(classSchema, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });
    if (errors.length > 0) {
      throw Error(
        `Config(type=${classSchema.name}) validation failed:\n${errors
          .map(
            (e) =>
              e.property +
              ' is not ' +
              Object.keys(e.constraints).toLocaleString().split(',').join(', '),
          )
          .join(';\n')}`,
      );
    }
    return validatedConfig;
  };
}
