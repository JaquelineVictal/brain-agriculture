import { HashHandler } from 'src/domain/service/hash-handler/hash-handler.service';
import { CustomerRepository } from '../../repository/customer/customer.repository';
import { Token } from '../class/token.class';
import { Email } from 'src/domain/class/email/email.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailNotFoundException } from '../exceptions/email-not-found.exception';
import { InvalidPasswordException } from '../exceptions/invalid-passowrd-exception';
import { JWT_SECRET } from '../auth.constants';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly _customerRepository: CustomerRepository,
    private readonly _hashHandler: HashHandler,
    private readonly _jwtService: JwtService,
  ) {}

  async authenticateCustomer(email: string, password: string) {
    const customerEmail = Email.create(email);
    const customer = await this._customerRepository.findByEmail(customerEmail);
    if (!customer) throw new EmailNotFoundException(customerEmail);

    if (!(await customer.hash.compare(password, this._hashHandler)))
      throw new InvalidPasswordException(customer);

    const token = await this._encode(new Token(customer));
    return {
      token,
      name: customer.name.value,
      id: customer.id.value,
      email: customer.email.value,
    };
  }

  async singIn(encodedToken: string) {
    const token = await this._decode(encodedToken);
    await this._customerExistsOrError(token.customerId);
    return new Uuid(token.customerId);
  }

  private async _customerExistsOrError(id: string) {
    const exists = await this._customerRepository.existsById(new Uuid(id));
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
