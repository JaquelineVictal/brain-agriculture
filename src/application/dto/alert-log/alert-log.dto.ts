import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsString } from 'class-validator';

export class AlertLogDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ type: Date })
  @IsString()
  @IsNotEmpty()
  occurredAt: string;

  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  cameraId: string;
}
