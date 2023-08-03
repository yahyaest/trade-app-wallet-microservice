import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { AssetModule } from './asset/asset.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            colorizeObjects: true,
            singleLine: false,
            levelFirst: false,
            // minimumLevel: 'trace',
            translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
            messageFormat:
              '{req.headers.x-correlation-id} [{context}] - url:{req.url} - {msg} \n \n',
            //ignore: 'pid,hostname,context,req,res,responseTime',
            ignore: 'context',
            errorLikeObjectKeys: ['err', 'error']
          },
        },
      },
    }),

    PrismaModule,
    AuthModule,
    WalletModule,
    AssetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
