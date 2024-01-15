import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/application/dto/customer/customer.dto';
import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';
import { CustomerRepository } from 'src/infrastructure/repository/customer/customer.repository';
import { HashHandler } from '../hash-handler/hash-handler.service';
import { Email } from 'src/domain/class/email/email.class';
import { Document } from 'src/domain/class/cpf/cpf.class';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { NotFoundException } from '../exception-handler/default-exception/not-found.exception copy';

@Injectable()
export class CustomerService {
  constructor(
    private readonly _repository: CustomerRepository,
    private readonly _hashHandler: HashHandler,
  ) {}

  async created(createCustomerDto: CustomerDto): Promise<CustomerEntity> {
    const createCustomerEntity = await CustomerEntity.create({
      ...createCustomerDto,
      hashHandler: this._hashHandler,
    });

    await this._existingCustomerByEmail(createCustomerEntity.email);
    await this._existingCustomerByCpf(createCustomerEntity.cpf);

    return await this._repository.created(createCustomerEntity);
  }

  async findById(customerId: string): Promise<CustomerEntity> {
    const findCustomer = await this._findCustomerById(new Uuid(customerId));
    return findCustomer;
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this._repository.findAll();
  }

  async updateById(customerDto: CustomerDto): Promise<CustomerEntity> {
    const customerEntity = await CustomerEntity.create({
      ...customerDto,
      hashHandler: this._hashHandler,
    });

    await this._findCustomerById(customerEntity.id);

    return await this._repository.updateById(customerEntity);
  }

  async deleteById(customerId: string): Promise<CustomerEntity> {
    const customerIdUuid = new Uuid(customerId);

    await this._findCustomerById(customerIdUuid);

    return await this._repository.deleteById(customerIdUuid);
  }

  private async _findCustomerById(userId: Uuid): Promise<CustomerEntity> {
    const findCustomer = await this._repository.findById(userId);

    if (!findCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return findCustomer;
  }

  private async _existingCustomerByEmail(email: Email): Promise<void> {
    const existingCustomer = await this._repository.findByEmail(email);

    if (existingCustomer) {
      throw new ConflictException('Email already exists');
    }
  }
  private async _existingCustomerByCpf(cpf: Document): Promise<void> {
    const existingCustomer = await this._repository.findByCpf(cpf);

    if (existingCustomer) {
      throw new ConflictException('CPF already exists');
    }
  }
}
