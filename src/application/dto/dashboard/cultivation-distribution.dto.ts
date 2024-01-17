import { ApiProperty } from '@nestjs/swagger';

export class CultivationDistributionDto {
  @ApiProperty({ type: Number })
  cultivationId: number;

  @ApiProperty({ type: Number })
  count: number;
}
