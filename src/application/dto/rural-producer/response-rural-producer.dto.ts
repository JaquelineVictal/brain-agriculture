import { ApiProperty } from '@nestjs/swagger';

export class ResponseRuralProducerDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  document: string;

  @ApiProperty({ type: String })
  nameProducer: string;

  @ApiProperty({ type: String })
  nameFarm: string;

  @ApiProperty({ type: String })
  city: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: Number })
  areaTotal: number;

  @ApiProperty({ type: Number })
  areaAgricultural: number;

  @ApiProperty({ type: Number })
  areaVegetation: number;

  @ApiProperty({ type: [Number] })
  cultivationIds?: number[];
}
