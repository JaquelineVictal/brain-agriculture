import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { IsAreaTotalValid } from 'src/utils/validators/area-total';

export class CreateRuralProducerDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  nameProducer: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  nameFarm: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  areaTotal: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  areaAgricultural: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  areaVegetation: number;

  @IsAreaTotalValid()
  isValidAreaTotal: boolean;

  @ApiProperty({ type: [Number], description: 'Array of cultivation IDs' })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  cultivationIds: number[];
}
