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
import { CreateRuralProducerDto } from 'src/application/dto/rural-producer/create-rural-producer.dto';
import { ResponseRuralProducerDto } from 'src/application/dto/rural-producer/response-rural-producer.dto';
import { UpdateRuralProducerDto } from 'src/application/dto/rural-producer/update-rural-producer.dto';

import { HttpErrorHandler } from 'src/application/services/error-handler/http-error-handler.service';
import { RuralProducerService } from 'src/domain/service/rural-producer/rural-producer.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';

@ApiTags('RuralProducer')
@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    private readonly _ruralProducerService: RuralProducerService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new ruralProducer' })
  @ApiOkResponse({
    status: 201,
    description: 'The ruralProducer has been successfully created.',
    type: ResponseRuralProducerDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(
    @Body() createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<ResponseRuralProducerDto> {
    try {
      return (
        await this._ruralProducerService.create(createRuralProducerDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get ruralProducer by ID' })
  @ApiParam({ name: 'id', description: 'RuralProducer ID' })
  @ApiResponse({
    status: 200,
    description: 'The ruralProducer was found.',
    type: ResponseRuralProducerDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'RuralProducer not found' })
  async findById(@Param('id') id: string): Promise<ResponseRuralProducerDto> {
    try {
      return (
        await this._ruralProducerService.findById(parseInt(id))
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all ruralProducers' })
  @ApiResponse({
    status: 200,
    description: 'List of ruralProducers.',
    type: [ResponseRuralProducerDto],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<ResponseRuralProducerDto[]> {
    try {
      const ruralProducersEntity = await this._ruralProducerService.findAll();

      return ruralProducersEntity.map((ruralProducerEntity) =>
        ruralProducerEntity.getResponseValues(),
      );
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update ruralProducer by ID' })
  @ApiParam({ name: 'id', description: 'ruralProducer ID' })
  @ApiResponse({
    status: 200,
    description: 'The ruralProducer was updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'ruralProducer not found' })
  async updateById(
    @Param('id') id: string,
    @Body() updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<ResponseRuralProducerDto> {
    try {
      return (
        await this._ruralProducerService.updateById(
          updateRuralProducerDto,
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
  @ApiOperation({ summary: 'Delete ruralProducer by ID' })
  @ApiParam({ name: 'id', description: 'RuralProducer ID' })
  @ApiResponse({
    status: 202,
    description: 'RuralProducer deleted successfully.',
    type: () => 'RuralProducer deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'RuralProducer not found' })
  async deleteById(@Param('id') id: string): Promise<string> {
    try {
      await this._ruralProducerService.deleteById(parseInt(id));

      return 'RuralProducer deleted successfully';
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
