import { HashHandler } from 'src/domain/service/hash-handler/hash-handler.service';
import { Token } from '../class/token.class';
import { Email } from 'src/domain/class/email/email.class';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailNotFoundException } from '../exceptions/email-not-found.exception';
import { InvalidPasswordException } from '../exceptions/invalid-passowrd-exception';
import { JWT_SECRET } from '../auth.constants';
import { UserRepository } from 'src/infrastructure/repository/user/user.repository';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _hashHandler: HashHandler,
    private readonly _jwtService: JwtService,
  ) {}

  async authenticateUser(email: string, password: string) {
    const userEmail = Email.create(email);
    const user = await this._userRepository.findByEmail(userEmail);
    if (!user) throw new EmailNotFoundException(userEmail);

    if (!(await user.hash.compare(password, this._hashHandler)))
      throw new InvalidPasswordException(user);

    const token = await this._encode(new Token(user));
    return {
      token,
      name: user.name.value,
      id: user.id,
      email: user.email.value,
    };
  }

  async singIn(encodedToken: string) {
    const token = await this._decode(encodedToken);
    await this._userExistsOrError(token.userId);
    return token.userId;
  }

  private async _userExistsOrError(id: number) {
    const exists = await this._userRepository.existsById(id);
    if (!exists) throw new UnauthorizedException();
  }

  private async _encode(token: Token): Promise<string> {
    return await this._jwtService.signAsync({ ...token });
  }

  private async _decode(value: string): Promise<Token> {
    const token = await this._jwtService.verifyAsync<Token>(value, {
      secret: JWT_SECRET,
    });

    return token;
  }
}
