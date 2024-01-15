import { PartialType } from '@nestjs/swagger';
import { CreateCultivationDto } from './createCultivation.dto';

export class UpdateCultivationDto extends PartialType(CreateCultivationDto) {}
