import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HttpErrorHandler } from 'src/application/services/error-handler/http-error-handler.service';
import { CreateCultivationDto } from 'src/application/dto/cultivation/create-cultivation.dto';
import { ResponseCultivationDto } from 'src/application/dto/cultivation/response-cultivation.dto';
import { UpdateCultivationDto } from 'src/application/dto/cultivation/update-cultivation.dto';
import { CultivationService } from 'src/domain/service/cultivation/cultivation.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';

@ApiTags('Cultivation')
@Controller('cultivation')
export class CultivationController {
  constructor(
    private readonly _cultivationService: CultivationService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new cultivation' })
  @ApiOkResponse({
    status: 201,
    description: 'The cultivation has been successfully created.',
    type: ResponseCultivationDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(
    @Body() createCultivationDto: CreateCultivationDto,
  ): Promise<ResponseCultivationDto> {
    try {
      return (
        await this._cultivationService.create(createCultivationDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get cultivation by ID' })
  @ApiParam({ name: 'id', description: 'Cultivation ID' })
  @ApiResponse({
    status: 200,
    description: 'The cultivation was found.',
    type: ResponseCultivationDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Cultivation not found' })
  async findById(@Param('id') id: string): Promise<ResponseCultivationDto> {
    try {
      return (
        await this._cultivationService.findById(parseInt(id))
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all cultivations' })
  @ApiResponse({
    status: 200,
    description: 'List of cultivations.',
    type: [ResponseCultivationDto],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<ResponseCultivationDto[]> {
    try {
      const cultivationsEntity = await this._cultivationService.findAll();

      return cultivationsEntity.map((cultivationEntity) =>
        cultivationEntity.getResponseValues(),
      );
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update cultivation by ID' })
  @ApiParam({ name: 'id', description: 'cultivation ID' })
  @ApiResponse({
    status: 200,
    description: 'The cultivation was updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'cultivation not found' })
  async updateById(
    @Param('id') id: string,
    @Body() updateCultivationDto: UpdateCultivationDto,
  ): Promise<ResponseCultivationDto> {
    try {
      return (
        await this._cultivationService.updateById(
          updateCultivationDto,
          parseInt(id),
        )
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete cultivation by ID' })
  @ApiParam({ name: 'id', description: 'Cultivation ID' })
  @ApiResponse({
    status: 202,
    description: 'Cultivation deleted successfully.',
    type: () => 'Cultivation deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Cultivation not found' })
  async deleteById(@Param('id') id: string): Promise<string> {
    try {
      await this._cultivationService.deleteById(parseInt(id));

      return 'Cultivation deleted successfully';
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
