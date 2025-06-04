import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true, // makes config available app-wide
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        port: 5432,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AuthService,AppService],
})
export class AppModule {}
