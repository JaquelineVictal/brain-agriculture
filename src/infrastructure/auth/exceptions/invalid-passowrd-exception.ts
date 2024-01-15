import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';

export class InvalidPasswordException extends AbstractException {
  readonly code = EXCEPTION_CODE.FORBIDDEN;
  constructor(customer: CustomerEntity) {
    super('Invalid Email or Password');
    this.add('customerId', customer.id.value);
    this.add('customerEmail', customer.email.value);
    this.add('customerName', customer.name.value);
  }
}
