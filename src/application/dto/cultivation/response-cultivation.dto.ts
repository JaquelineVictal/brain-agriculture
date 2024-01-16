import { ApiProperty } from '@nestjs/swagger';

export class ResponseCultivationDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;
}
