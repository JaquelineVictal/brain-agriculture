import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './services/jwt-auth.service';
import { SingInController } from './controllers/signin.controller';
import { JWT_EXPIRES_IN_MINUTES, JWT_SECRET } from './auth.constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RepositoryModule } from '../repository/repository.modulo';
import { ServiceModule } from 'src/domain/service/service.module';

@Module({
  imports: [
    RepositoryModule,
    ServiceModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: `${JWT_EXPIRES_IN_MINUTES}m`,
      },
    }),
  ],
  providers: [JwtAuthService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [SingInController],
  exports: [JwtAuthService],
})
export class AuthModule {}
