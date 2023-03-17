import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { RazorpayModule } from 'nestjs-razorpay';
import { OrderService } from './payment/order.service';
import { PaymentIntentSchema } from './payment/payment-intent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponModule } from '../coupon/coupon.module';
import { PaymentAccountService } from './account/payment-account.service';
import { PaymentAccountSchema } from './account/payment-account.schema';
import { PaymentAccountController } from './account/payment-account.controller';
import { CouponSchema } from '../coupon/coupon.schema';
import { paymentGatewayCreds } from '@backend/common/payment-gateway.config';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PaymentIntent', schema: PaymentIntentSchema },
      { name: 'PaymentAccount', schema: PaymentAccountSchema },
      { name: 'Coupon', schema: CouponSchema },
    ]),
    RazorpayModule.forRoot({
      key_id: paymentGatewayCreds.payemntKeyId,
      key_secret: paymentGatewayCreds.paymentKeySecret,
    }),
    CouponModule,
    UsersModule,
  ],
  controllers: [PaymentController, PaymentAccountController],
  providers: [PaymentAccountService, OrderService, PaymentService],
  exports: [PaymentAccountService, OrderService, PaymentService],
})
export class PaymentModule {}
