import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CultivationDistributionDto } from 'src/application/dto/dashboard/cultivation-distribution.dto';
import { LandUseDistributionDto } from 'src/application/dto/dashboard/land-use-distribution.dto';
import { StateDistributionDto } from 'src/application/dto/dashboard/state-distribution.dto';

import { HttpErrorHandler } from 'src/application/services/error-handler/http-error-handler.service';
import { DashboardService } from 'src/domain/service/dashboard/dashboard.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly _dashboardService: DashboardService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}

  @Get('total-farms-count')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Total farms in quantity' })
  @ApiOkResponse({
    status: 201,
    description: 'Total farms in quantity',
    type: Number,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getTotalFarmsCount(): Promise<number> {
    try {
      return await this._dashboardService.getTotalFarmsCount();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get('total-farm-area')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Total farms in area' })
  @ApiOkResponse({
    status: 201,
    description: 'Total farms in area',
    type: Number,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getTotalFarmArea(): Promise<number> {
    try {
      return await this._dashboardService.getTotalFarmArea();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get('state-distribution')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Total farms by State' })
  @ApiOkResponse({
    status: 201,
    description: 'Total farms by State',
    type: StateDistributionDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getStateDistribution(): Promise<StateDistributionDto[]> {
    try {
      return await this._dashboardService.getStateDistribution();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get('cultivation-distribution')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Total farms by cultivation' })
  @ApiOkResponse({
    status: 201,
    description: 'Total farms by cultivation',
    type: CultivationDistributionDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getCultivationDistribution(): Promise<CultivationDistributionDto[]> {
    try {
      return await this._dashboardService.getCultivationDistribution();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get('land-use-distribution')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Total farms by land' })
  @ApiOkResponse({
    status: 201,
    description: 'Total farms by land',
    type: LandUseDistributionDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getLandUseDistribution(): Promise<LandUseDistributionDto> {
    try {
      return await this._dashboardService.getLandUseDistribution();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
