import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpUserPayload, HttpRequestWithUser } from '@app/api/graphql/auth/type/HttpAuthTypes';

export const HttpUser: () => ParameterDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext): HttpUserPayload => {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const request: HttpRequestWithUser = ctx.getContext().req;

    return request.user;
  },
);
