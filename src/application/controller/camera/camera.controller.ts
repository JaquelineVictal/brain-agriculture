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
import { CameraService } from 'src/domain/service/camera/camera.service';
import { TCamera } from 'src/domain/entity/camera/camera.entity';
import { CameraDto } from 'src/application/dto/camera/camera.dto';

@ApiTags('Cameras')
@Controller('cameras')
export class CameraController {
  constructor(
    private readonly _cameraService: CameraService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Create a new camera' })
  @ApiResponse({
    status: 201,
    description: 'The camera has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(@Body() cameraDto: CameraDto): Promise<TCamera> {
    try {
      return (await this._cameraService.created(cameraDto)).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get camera by ID' })
  @ApiParam({ name: 'id', description: 'camera ID' })
  @ApiResponse({
    status: 200,
    description: 'The camera was found.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'camera not found' })
  async findById(@Param('id') id: string): Promise<TCamera> {
    try {
      return (await this._cameraService.findById(id)).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all cameras' })
  @ApiQuery({ name: 'isEnabled', type: 'boolean' })
  @ApiQuery({ name: 'customerId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'List of camera filter by isEnabled and customerId.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(
    @Query('isEnabled') isEnabled?: string,
    @Query('customerId') customerId?: string,
  ): Promise<TCamera[]> {
    try {
      const camerasEntity = await this._cameraService.findAll({
        isEnabled,
        customerId,
      });
      return camerasEntity.map((cameraEntity) =>
        cameraEntity.getResponseValues(),
      );
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update camera by ID' })
  @ApiParam({ name: 'id', description: 'camera ID' })
  @ApiResponse({
    status: 200,
    description: 'The camera was updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'camera not found' })
  async updateById(
    @Param('id') id: string,
    @Body() cameraDto: CameraDto,
  ): Promise<TCamera> {
    try {
      cameraDto.id = id;

      return (
        await this._cameraService.updateById(cameraDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete camera by ID' })
  @ApiParam({ name: 'id', description: 'camera ID' })
  @ApiResponse({
    status: 202,
    description: 'Camera deleted successfully.',
    type: () => 'Camera deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Camera not found' })
  async deleteById(@Param('id') id: string): Promise<string> {
    try {
      await this._cameraService.deleteById(id);

      return 'Camera deleted successfully';
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
