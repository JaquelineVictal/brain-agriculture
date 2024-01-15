import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TCustomer } from 'src/domain/entity/customer/customer.entity';
import { CustomerDto } from 'src/application/dto/customer/customer.dto';
import { CustomerService } from 'src/domain/service/customer/customer.service';
import { HttpErrorHandler } from 'src/application/services/error-handler/http-error-handler.service';
import { Public } from 'src/infrastructure/auth/decorators/is-public.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly _customerService: CustomerService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(@Body() customerDto: CustomerDto): Promise<TCustomer> {
    try {
      return (
        await this._customerService.created(customerDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({
    status: 200,
    description: 'The customer was found.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async findById(@Param('id') id: string): Promise<TCustomer> {
    try {
      return (await this._customerService.findById(id)).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get()
  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of customers.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<TCustomer[]> {
    try {
      const customersEntity = await this._customerService.findAll();

      return customersEntity.map((customerEntity) =>
        customerEntity.getResponseValues(),
      );
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update customer by ID' })
  @ApiParam({ name: 'id', description: 'customer ID' })
  @ApiResponse({
    status: 200,
    description: 'The customer was updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'customer not found' })
  async updateById(
    @Param('id') id: string,
    @Body() customerDto: CustomerDto,
  ): Promise<TCustomer> {
    try {
      customerDto.id = id;

      return (
        await this._customerService.updateById(customerDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({
    status: 202,
    description: 'Customer deleted successfully.',
    type: () => 'Customer deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async deleteById(@Param('id') id: string): Promise<string> {
    try {
      await this._customerService.deleteById(id);

      return 'Customer deleted successfully';
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
