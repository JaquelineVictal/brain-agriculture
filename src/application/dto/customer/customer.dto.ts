import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
export class CustomerDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: '314.511.450-63 or 31451145063' })
  @IsString()
  @IsNotEmpty()
  cpf: string;
}
