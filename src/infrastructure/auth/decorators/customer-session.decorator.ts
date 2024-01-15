import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const CustomerSession = createParamDecorator(
  async (ctx: ExecutionContext) => {
    const httpContext = ctx.switchToHttp();
    const request = httpContext.getRequest();

    if (!request.customer) throw new UnauthorizedException();

    return request.customer;
  },
);
