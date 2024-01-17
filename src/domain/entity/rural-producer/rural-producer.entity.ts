import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { ENTITY_STATUS } from '../entity-status.enum';
import { Prisma } from '@prisma/client';
import { ResponseRuralProducerDto } from 'src/application/dto/rural-producer/response-rural-producer.dto';
import { HumanDocument } from 'src/domain/class/human-document/human-document.class';

export class RuralProducerEntity {
  readonly id?: number;
  readonly document: HumanDocument;
  readonly nameProducer: HumanName;
  readonly nameFarm: string;
  readonly city: string;
  readonly state: string;
  readonly areaTotal: number;
  readonly areaAgricultural: number;
  readonly areaVegetation: number;
  readonly cultivationIds?: number[];
  readonly status: ENTITY_STATUS;

  constructor(props: TRuralProducerEntityProps) {
    this.id = props.id;
    this.document = props.document;
    this.nameProducer = props.nameProducer;
    this.nameFarm = props.nameFarm;
    this.city = props.city;
    this.state = props.state;
    this.areaTotal = props.areaTotal;
    this.areaAgricultural = props.areaAgricultural;
    this.areaVegetation = props.areaVegetation;
    this.cultivationIds = props.cultivationIds;
    this.status = props.status;
  }

  static async create(params: TRuralProducerEntityParams) {
    return new RuralProducerEntity({
      document: HumanDocument.create(params.document),
      nameProducer: HumanName.create(params.nameProducer),
      nameFarm: params.nameFarm,
      city: params.city,
      state: params.state,
      areaTotal: params.areaTotal,
      areaAgricultural: params.areaAgricultural,
      areaVegetation: params.areaVegetation,
      cultivationIds: params.cultivationIds,
      status: ENTITY_STATUS.ACTIVE,
    });
  }

  static fromDatabase(params): RuralProducerEntity {
    return new RuralProducerEntity({
      id: params.id,
      document: new HumanDocument(params.document),
      nameProducer: new HumanName(params.nameProducer),
      nameFarm: params.nameFarm,
      city: params.city,
      state: params.state,
      areaTotal: params.areaTotal,
      areaAgricultural: params.areaAgricultural,
      areaVegetation: params.areaVegetation,
      cultivationIds: this.getCultivationIdsFromDatabase(
        params.ruralProducerCultivation,
      ),
      status: params.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
    });
  }

  getPrismaModelCreate(): Prisma.RuralProducerCreateInput {
    return {
      document: this.document.value,
      nameProducer: this.nameProducer.value,
      nameFarm: this.nameFarm,
      city: this.city,
      state: this.state,
      areaTotal: this.areaTotal,
      areaAgricultural: this.areaAgricultural,
      areaVegetation: this.areaVegetation,
    };
  }

  async getPrismaModelUpdate(
    params: TRuralProducerEntityUpdateParams,
  ): Promise<Prisma.RuralProducerUpdateInput> {
    return {
      document: params.document
        ? HumanDocument.create(params.document).value
        : undefined,
      nameProducer: params.nameProducer
        ? HumanName.create(params.nameProducer).value
        : undefined,
      nameFarm: params.nameFarm,
      city: params.city,
      state: params.state,
      areaTotal: params.areaTotal,
      areaAgricultural: params.areaAgricultural,
      areaVegetation: params.areaVegetation,
    };
  }

  getCultivationIds(): number[] {
    return this.cultivationIds;
  }

  getResponseValues(): ResponseRuralProducerDto {
    return {
      id: this.id,
      document: this.document.value,
      nameProducer: this.nameProducer.value,
      nameFarm: this.nameFarm,
      city: this.city,
      state: this.state,
      areaTotal: this.areaTotal,
      areaAgricultural: this.areaAgricultural,
      areaVegetation: this.areaVegetation,
      cultivationIds: this.cultivationIds,
    };
  }

  private static getCultivationIdsFromDatabase(
    ruralProducerCultivation,
  ): number[] {
    return ruralProducerCultivation?.map((ruralProducerCultivation) => {
      return ruralProducerCultivation.cultivationId;
    });
  }
}

type TRuralProducerEntityProps = {
  readonly id?: number;
  readonly document: HumanDocument;
  readonly nameProducer: HumanName;
  readonly nameFarm: string;
  readonly city: string;
  readonly state: string;
  readonly areaTotal: number;
  readonly areaAgricultural: number;
  readonly areaVegetation: number;
  readonly cultivationIds?: number[];
  readonly status: ENTITY_STATUS;
};

type TRuralProducerEntityParams = {
  readonly document: string;
  readonly nameProducer: string;
  readonly nameFarm: string;
  readonly city: string;
  readonly state: string;
  readonly areaTotal: number;
  readonly areaAgricultural: number;
  readonly areaVegetation: number;
  readonly cultivationIds?: number[];
};

type TRuralProducerEntityUpdateParams = {
  readonly document?: string;
  readonly nameProducer?: string;
  readonly nameFarm?: string;
  readonly city?: string;
  readonly state?: string;
  readonly areaTotal?: number;
  readonly areaAgricultural?: number;
  readonly areaVegetation?: number;
  readonly cultivationIds?: number[];
};
