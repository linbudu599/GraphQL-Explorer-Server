import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  ClassType,
  ArgumentValidationError,
  createMethodDecorator,
  ResolverData,
  NextFn,
} from "type-graphql";

export default function ValidateArgs<T extends object>(type: ClassType<T>) {
  const validator = async ({ args }: ResolverData, next: NextFn) => {
    const instance = plainToClass(type, args);
    const validationErrors = await validate(instance);
    if (validationErrors.length > 0) {
      throw new ArgumentValidationError(validationErrors);
    }
    return next();
  };

  return createMethodDecorator(validator);
}
