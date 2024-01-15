import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CameraDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    type: String,
    example: '192.168.0.1 or 2001:0db8:85a3:0000:0000:8a2e:0370:7334',
  })
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  isEnabled: boolean;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;
}
