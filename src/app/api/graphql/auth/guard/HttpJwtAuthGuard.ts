import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpRequestWithUser } from '@app/api/graphql/auth/type/HttpAuthTypes';

@Injectable()
export class HttpJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): HttpRequestWithUser {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const request: HttpRequestWithUser = ctx.getContext().req;

    return request;
  }
}
