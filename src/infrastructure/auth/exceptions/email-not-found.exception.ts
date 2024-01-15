import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { Email } from 'src/domain/class/email/email.class';

export class EmailNotFoundException extends AbstractException {
  readonly code = EXCEPTION_CODE.FORBIDDEN;
  constructor(email: Email) {
    super('Invalid Email or Password');
    this.add('email', email);
  }
}
