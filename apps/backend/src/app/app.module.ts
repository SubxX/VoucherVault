import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './categories/category.module';
import { CouponModule } from './coupon/coupon.module';
import { MediaModule } from './media/media.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    MediaModule,
    UsersModule,
    AuthModule,
    BrandModule,
    CategoryModule,
    CouponModule,
    NotificationModule,
    PaymentModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
