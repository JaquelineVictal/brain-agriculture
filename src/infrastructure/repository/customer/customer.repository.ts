import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';
import { CustomerModel } from 'src/infrastructure/model/customer/customer.model';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { Email } from 'src/domain/class/email/email.class';
import { Document } from 'src/domain/class/cpf/cpf.class';

@Injectable()
export class CustomerRepository {
  constructor(private database: DatabaseService) {}

  async created(customerEntity: CustomerEntity): Promise<CustomerEntity> {
    const customerModel = CustomerModel.fromEntity(customerEntity);

    const saveNewCustomer = await this.database.customers.create({
      data: customerModel.saveNewCustomer(),
    });

    return CustomerEntity.fromDatabase(saveNewCustomer);
  }

  async findById(id: Uuid): Promise<CustomerEntity | null> {
    const customer = await this.database.customers.findUnique({
      where: { id: id.value },
    });

    if (!customer) return null;

    return CustomerEntity.fromDatabase(customer);
  }

  async findByEmail(email: Email): Promise<CustomerEntity | null> {
    const customer = await this.database.customers.findUnique({
      where: { email: email.value },
    });

    if (!customer) return null;

    return CustomerEntity.fromDatabase(customer);
  }
  async findByCpf(cpf: Document): Promise<CustomerEntity | null> {
    const customer = await this.database.customers.findUnique({
      where: { cpf: cpf.value },
    });

    if (!customer) return null;

    return CustomerEntity.fromDatabase(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    const customers = await this.database.customers.findMany();

    if (!customers.length) return [];

    return customers.map((customer) => CustomerEntity.fromDatabase(customer));
  }

  async updateById(customerEntity: CustomerEntity): Promise<CustomerEntity> {
    const customerModel = CustomerModel.fromEntity(customerEntity);

    const customer = await this.database.customers.update({
      data: customerModel.saveNewCustomer(),
      where: { id: customerModel.id },
    });

    return CustomerEntity.fromDatabase(customer);
  }

  async deleteById(id: Uuid): Promise<CustomerEntity> {
    const customer = await this.database.customers.update({
      data: { deletedAt: new Date() },
      where: { id: id.value },
    });
    return CustomerEntity.fromDatabase(customer);
  }

  async existsById(id: Uuid): Promise<boolean> {
    const customer = await this.database.customers.findFirst({
      where: { id: id.value },
    });

    return customer ? true : false;
  }
}
