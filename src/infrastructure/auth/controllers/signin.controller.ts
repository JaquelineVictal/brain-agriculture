import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../decorators/is-public.decorator';
import { SignInDto } from './dtos/signin.dto';
import { JwtAuthService } from '../services/jwt-auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SignIn')
@Controller('sign-in')
export class SingInController {
  constructor(private readonly _authService: JwtAuthService) {}

  @Public()
  @Post()
  async jwtSingIn(@Body() input: SignInDto) {
    const payload = await this._authService.authenticateUser(
      input.email,
      input.password,
    );

    return payload;
  }
}
