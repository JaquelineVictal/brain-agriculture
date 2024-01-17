import { ApiProperty } from '@nestjs/swagger';

export class StateDistributionDto {
  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: Number })
  count: number;
}
