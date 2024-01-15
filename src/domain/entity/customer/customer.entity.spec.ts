import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { CustomerEntity } from './customer.entity';
import { Document } from 'src/domain/class/cpf/cpf.class';
import { Email } from 'src/domain/class/email/email.class';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { CameraEntity } from '../camera/camera.entity';
import { ENTITY_STATUS } from '../entity-status.enum';
import { Ip } from 'src/domain/class/ip/ip.class';
import { Hash } from 'src/domain/class/hash/hash.class';

const customerMock = new CustomerEntity({
  id: Uuid.create(),
  name: new HumanName('John Doe'),
  email: new Email('john.doe@example.com'),
  hash: new Hash('hash'),
  status: ENTITY_STATUS.ACTIVE,
  cpf: new Document('31451145063'),
  cameras: [
    new CameraEntity({
      id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      ip: new Ip('192.168.0.1'),
      name: 'Camera 1',
      isEnabled: true,
      status: ENTITY_STATUS.ACTIVE,
    }),
    new CameraEntity({
      id: new Uuid('7162f0be-7774-11ee-b962-0242ac120002'),
      ip: new Ip('192.168.0.2'),
      name: 'Camera 2',
      isEnabled: true,
      status: ENTITY_STATUS.ACTIVE,
    }),
  ],
});

describe('CustomerEntity', () => {
  it('should return the correct camera entity when given a valid camera id', async () => {
    const result = customerMock.getCamera(
      new Uuid('45726886-7774-11ee-b962-0242ac120002'),
    );

    expect(result).toEqual(
      new CameraEntity({
        id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
        ip: new Ip('192.168.0.1'),
        name: 'Camera 1',
        isEnabled: true,
        status: ENTITY_STATUS.ACTIVE,
      }),
    );
  });

  it('should return null when given an invalid camera id', async () => {
    const result = customerMock.getCamera(
      new Uuid('7e539a94-7774-11ee-b962-0242ac120002'),
    );

    expect(result).toBeUndefined();
  });
});
