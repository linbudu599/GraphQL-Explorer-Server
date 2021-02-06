import { Extensions } from "type-graphql";

interface ILogOptions {
  message: string;
  level?: number;
}

type Decorators = PropertyDecorator & MethodDecorator & ClassDecorator;

// use: @LogExtension("xxx")
export const LogExtension = (msgOrOpts: string | ILogOptions): Decorators => {
  return Extensions({
    log:
      typeof msgOrOpts === "string"
        ? {
            level: 4,
            msg: msgOrOpts,
          }
        : msgOrOpts,
  });
};
