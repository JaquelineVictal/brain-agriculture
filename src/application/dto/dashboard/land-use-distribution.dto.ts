import { ApiProperty } from '@nestjs/swagger';

export class LandUseDistributionDto {
  @ApiProperty({ type: Number })
  areaTotal: number;

  @ApiProperty({ type: Number })
  areaAgricultural: number;

  @ApiProperty({ type: Number })
  areaVegetation: number;
}
