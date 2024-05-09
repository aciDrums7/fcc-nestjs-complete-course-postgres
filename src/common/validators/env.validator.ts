import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'prod',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  API_VERSION: string;

  @IsNumber()
  PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  DB_TYPE: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  OPENAPI_PATH: string;

  @IsString()
  @IsOptional()
  TS_POST_PROCESS_FILE: string;
}

export function validate(config: Record<string, unknown>) {
  //plainInstance converts plain (literal) object to class (constructor) object.
  // Also works with arrays.
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    /**
    * enableImplicitConversion will tell class-transformer that if it sees a
    primitive that is currently a string (like a boolean or a number) to assume it
    should be the primitive type instead and transform it, even though @Type(() =>
    Number) or @Type(() => Boolean) isn't used
    */
    enableImplicitConversion: true,
  });
  // console.log(validatedConfig);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
