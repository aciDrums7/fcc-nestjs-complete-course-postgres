import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Make ConfigModule available
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(
          'JWT_SECRET',
          '9f8d2e207e45a8deadb4cff8e',
        ),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE_TIME', '1h'),
        },
      }),
    }),
    // PassportModule,
  ],
})
export class AuthModule {}
