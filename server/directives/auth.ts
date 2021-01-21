import { forEachField } from "graphql-tools";
import { getArgumentValues } from "graphql/execution/values";
import jwt from "jsonwebtoken";

interface IAuthDirectiveResolver {
  // Promise Support?
  // FIXME: return ?
  isAuthenticated: (...args: any) => boolean;
  hasCorrectScope: (...args: any) => boolean;
}

const directiveResolvers: IAuthDirectiveResolver = {
  isAuthenticated: () => true,
  hasCorrectScope: () => true,
};

const attachDirectives = (schema) => {
  forEachField(schema, (field) => {
    const directives = field.astNode!.directives!;
    directives.forEach((directive) => {
      const directiveName = directive.name
        .value as keyof IAuthDirectiveResolver;
      const resolver = directiveResolvers[directiveName];

      // if (resolver) {
      const oldResolve = field.resolve;
      const Directive = schema.getDirective(directiveName);
      const args = getArgumentValues(Directive, directive);

      field.resolve = function () {
        // const [source, _, context, info] = arguments;
        // let promise = oldResolve!.call(field, ...arguments);

        // const isPrimitive = !(promise instanceof Promise);
        // if (isPrimitive) {
        //   promise = Promise.resolve(promise);
        // }

        // return promise.then((result) =>
        //   resolver(result, source, args, context, info)
        // );
        return true;
      };
      // }
    });
  });
};
