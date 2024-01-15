import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class PostDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
