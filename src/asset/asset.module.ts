import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { JwtModule } from '@nestjs/jwt';
import { WalletAuthMiddleware } from 'src/auth/middleware/auth.middleware';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(WalletAuthMiddleware).forRoutes('api/coins');
    // consumer.apply(WalletAuthMiddleware).forRoutes({path:'api/coins',  method: RequestMethod.ALL });
    consumer.apply(WalletAuthMiddleware).forRoutes(AssetController);
  }
}
