import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCultivationDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
