import { ApiProperty } from '@nestjs/swagger';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';

export class UserResponseDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  status: ENTITY_STATUS;
}
