import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { JwtModule } from '@nestjs/jwt';
import { WalletAuthMiddleware } from 'src/auth/middleware/auth.middleware';

@Module({
  imports: [JwtModule.register({})],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(WalletAuthMiddleware).forRoutes('api/coins');
    // consumer.apply(WalletAuthMiddleware).forRoutes({path:'api/coins',  method: RequestMethod.ALL });
    consumer.apply(WalletAuthMiddleware).forRoutes(HistoryController);
  }
}