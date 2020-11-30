import { validate } from "class-validator";
import {
  createParamDecorator,
  createMethodDecorator,
  ClassType,
  ArgumentValidationError,
  MiddlewareFn,
} from "type-graphql";
import { IContext } from "../typding";

/**
 * @desc 注入当前的用户
 * @example `@InjectCurrentUser()`
 */
export const InjectCurrentUser = () =>
  createParamDecorator<IContext>(({ context }) => context.currentUser);

/**
 * @desc 注入本次请求容器
 * @example `@InjectCurrentContainer()`
 */
export const InjectCurrentContainer = () =>
  createParamDecorator<IContext>(({ context }) => context.container);

/**
 * @desc 自定义校验schema
 * @example `@CustomArgsValidation(UserQueryArgs)`
 * @requires 禁用Arg装饰器的校验`@Args({ validate: false })`
 */
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
