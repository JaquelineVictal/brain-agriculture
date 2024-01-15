import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';

export class Token {
  readonly customerId: string;

  constructor(customer: CustomerEntity) {
    this.customerId = customer.id.value;
  }
}
