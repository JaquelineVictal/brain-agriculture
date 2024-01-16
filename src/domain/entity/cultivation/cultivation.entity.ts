import { ResponseCultivationDto } from 'src/application/dto/cultivation/response-cultivation.dto';
import { ENTITY_STATUS } from '../entity-status.enum';
import { Prisma } from '@prisma/client';

export class CultivationEntity {
  readonly id?: number;
  readonly name: string;
  readonly status: ENTITY_STATUS;

  constructor(props: TCultivationEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.status = props.status;
  }

  static async create(params: TCultivationEntityParams) {
    return new CultivationEntity({
      name: params.name,
      status: ENTITY_STATUS.ACTIVE,
    });
  }

  static fromDatabase(params): CultivationEntity {
    return new CultivationEntity({
      id: params.id,
      name: params.name,
      status: params.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
    });
  }

  getPrismaModelCreate(): Prisma.CultivationCreateInput {
    return {
      name: this.name,
    };
  }

  async getPrismaModelUpdate(
    params: TCultivationEntityUpdateParams,
  ): Promise<Prisma.CultivationUpdateInput> {
    return {
      name: params.name ? params.name : undefined,
    };
  }

  getResponseValues(): ResponseCultivationDto {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

type TCultivationEntityProps = {
  readonly id?: number;
  readonly name: string;
  readonly status: ENTITY_STATUS;
};

type TCultivationEntityParams = {
  readonly name: string;
};

type TCultivationEntityUpdateParams = {
  readonly name: string;
};
