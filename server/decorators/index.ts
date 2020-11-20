import { validate } from "class-validator";
import {
  createParamDecorator,
  createMethodDecorator,
  ClassType,
  ArgumentValidationError,
  MiddlewareFn,
} from "type-graphql";
import { IContext } from "../typding";

export const InjectCurrentUser = () =>
  createParamDecorator<IContext>(({ context }) => context.currentUser);

export const CustomArgsValidation = <T extends object>(
  ValidateSchema: ClassType<T>
) => {
  const executeValidate: MiddlewareFn = async ({ args }, next) => {
    const ins = Object.assign(new ValidateSchema(), args);
    const validationErrors = await validate(ins);
    const hasValidationErrors = validationErrors.length > 0;

    if (hasValidationErrors) {
      throw new ArgumentValidationError(validationErrors);
    }

    return await next();
  };

  return createMethodDecorator(executeValidate);
};
