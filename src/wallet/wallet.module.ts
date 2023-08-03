import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { JwtModule } from '@nestjs/jwt';
import { WalletAuthMiddleware } from 'src/auth/middleware/auth.middleware';

@Module({
  imports: [JwtModule.register({})],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(WalletAuthMiddleware).forRoutes('api/coins');
    // consumer.apply(WalletAuthMiddleware).forRoutes({path:'api/coins',  method: RequestMethod.ALL });
    consumer.apply(WalletAuthMiddleware).forRoutes(WalletController);
  }
}
