import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsModule } from 'src/resources/artists/artists.module';
import { UsersModule } from 'src/resources/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JWTStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn', '1h'),
        },
      }),
    }),
    UsersModule,
    ArtistsModule,
  ],
})
export class AuthModule {}
