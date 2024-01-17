import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const UserSession = createParamDecorator(
  async (ctx: ExecutionContext) => {
    const httpContext = ctx.switchToHttp();
    const request = httpContext.getRequest();

    if (!request.user) throw new UnauthorizedException();

    return request.user;
  },
);
