import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpErrorHandler } from 'src/application/services/error-handler/http-error-handler.service';
import { TAlertLog } from 'src/domain/entity/alert-log/alert-log.entity';
import { AlertLogService } from 'src/domain/service/alert-log/alert-log.service';
import { AlertLogDto } from 'src/application/dto/alert-log/alert-log.dto';

@ApiTags('Alert Logs')
@Controller('alert-logs')
export class AlertLogsController {
  constructor(
    private readonly _alertLogService: AlertLogService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new alert' })
  @ApiResponse({
    status: 201,
    description: 'The alert has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(@Body() alertLogDto: AlertLogDto): Promise<TAlertLog> {
    try {
      return (
        await this._alertLogService.created(alertLogDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get alert by ID' })
  @ApiParam({ name: 'id', description: 'alert ID' })
  @ApiResponse({
    status: 200,
    description: 'The alert was found.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'alert not found' })
  async findById(@Param('id') id: string): Promise<TAlertLog> {
    try {
      return (await this._alertLogService.findById(id)).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts' })
  @ApiQuery({ name: 'isEnabled', type: 'boolean' })
  @ApiQuery({ name: 'customerId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'List of alerts filter',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(
    @Query('startDateTime') startDateTime?: string,
    @Query('endDateTime') endDateTime?: string,
    @Query('customerId') customerId?: string,
  ): Promise<TAlertLog[]> {
    try {
      const alertLogsEntity = await this._alertLogService.findAll({
        startDateTime,
        endDateTime,
        customerId,
      });
      return alertLogsEntity.map((alertLogEntity) =>
        alertLogEntity.getResponseValues(),
      );
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update alert by ID' })
  @ApiParam({ name: 'id', description: 'alert ID' })
  @ApiResponse({
    status: 200,
    description: 'The alert was updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'alert not found' })
  async updateById(
    @Param('id') id: string,
    @Body() alertLogDto: AlertLogDto,
  ): Promise<TAlertLog> {
    try {
      alertLogDto.id = id;

      return (
        await this._alertLogService.updateById(alertLogDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({ summary: 'alert by ID' })
  @ApiParam({ name: 'id', description: 'alert ID' })
  @ApiResponse({
    status: 202,
    description: 'alert deleted successfully.',
    type: () => 'alert deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'alert not found' })
  async deleteById(@Param('id') id: string): Promise<string> {
    try {
      await this._alertLogService.deleteById(id);

      return 'Alert deleted successfully';
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
