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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HttpErrorHandler } from 'src/application/services/error-handler/http-error-handler.service';
import { Public } from 'src/infrastructure/auth/decorators/is-public.decorator';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UserService } from 'src/domain/service/user/user.service';
import { UserResponseDto } from 'src/application/dto/user/response-user.dto';
import { UpdateUserDto } from 'src/application/dto/user/update-user.dto';

@ApiTags('User')
@Controller('ser')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _httpErrorHandler: HttpErrorHandler,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    try {
      return (
        await this._userService.create(createUserDto)
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user was found.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      return (
        await this._userService.findById(parseInt(id))
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Get()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users.',
    type: [UserResponseDto],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<UserResponseDto[]> {
    try {
      const usersEntity = await this._userService.findAll();

      return usersEntity.map((userEntity) => userEntity.getResponseValues());
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'user ID' })
  @ApiResponse({
    status: 200,
    description: 'The user was updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'user not found' })
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      return (
        await this._userService.updateById(updateUserDto, parseInt(id))
      ).getResponseValues();
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 202,
    description: 'User deleted successfully.',
    type: () => 'User deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteById(@Param('id') id: string): Promise<string> {
    try {
      await this._userService.deleteById(parseInt(id));

      return 'User deleted successfully';
    } catch (error) {
      throw this._httpErrorHandler.handle(error);
    }
  }
}
