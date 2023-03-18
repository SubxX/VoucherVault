import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRazorpay } from 'nestjs-razorpay';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { VerifyPaymentReq } from './payment.dto';
import { PaymentIntent, PaymentIntentDocument } from './payment-intent.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { paymentGatewayCreds } from '@backend/common/payment-gateway.config';
import { CouponService } from '@backend/app/coupon/coupon.service';
import { User, UserDocument } from '@backend/app/user/user.schema';
import { TriggerNotificationBody } from '@backend/app/notification/notification.dto';
import { NotificationService } from '@backend/app/notification/notification.service';

@Injectable()
export class PaymentService {
  // private instance = new Razorpay({
  //   key_id: '',
  //   key_secret: '',
  // });

  constructor(
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
    @InjectModel(PaymentIntent.name)
    private baseModel: Model<PaymentIntentDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private couponService: CouponService,
    private notificationService: NotificationService
  ) {}

  async paymentVerification(body: VerifyPaymentReq) {
    const generatedSignature = crypto
      .createHmac('sha256', paymentGatewayCreds.paymentKeySecret)
      .update(body.razorpayOrderId + '|' + body.razorpayPaymentId)
      .digest('hex');

    const payment = await this.baseModel
      .findOne({
        orderId: body.razorpayOrderId,
      })
      .populate('coupon');
    const rzpayment = await this.razorpayClient.payments.fetch(
      body.razorpayPaymentId
    );
    const rzorder = await this.razorpayClient.orders.fetch(
      body.razorpayOrderId
    );
    if (
      rzpayment.status == 'captured' &&
      generatedSignature == body.razorpaySignature
    ) {
      console.log('payment verified', payment);

      const updateCoupon = await this.couponService.updateAvialbility(
        payment.coupon,
        {
          isAvailable: false,
        }
      );
      const coupon = await this.couponService.revealCouponCode(payment.coupon);
      console.log('Update coupon availability', updateCoupon);

      const updatedPayment = await this.baseModel.findByIdAndUpdate(
        payment.id,
        {
          $set: {
            status: rzpayment.status === 'captured',
            'data.order': rzorder,
            'data.signatureVerified': true,
            'data.razorpayPaymentId': body.razorpayPaymentId,
            'data.razorpaySignature': body.razorpaySignature,
          },
        },
        { new: true }
      );

      const user = await this.userModel.findById(updateCoupon.createdBy);
      const templatebody: TriggerNotificationBody = {
        templateName: 'coupon-payment-successful',
        subscriberId: user.email,
        email: user.email,
        payload: {
          couponCode: coupon.code,
          couponCommission: +payment.amount / 100,
          currency: updateCoupon.currency,
        },
      };

      console.log('templateBody', templatebody);
      await this.notificationService.trigger(templatebody);

      // const coupon = await this.couponModel
      //   .findById(payment.coupon)
      //   .populate('createdBy');

      // console.log('coupon', coupon, rzpayment);

      // const paymentAccount = await this.accountService.fetchPaymentAccount(
      //   coupon.createdBy
      // );
      // console.log(
      //   'paymentAccount',
      //   paymentAccount,
      //   +rzpayment.amount - +rzpayment.amount * 0.08,
      //   `https://api.razorpay.com/v1/payments/${rzpayment.id}/transfers`
      // );
      // try {
      // const trnasfer = await this.razorpayClient.payments.transfer(
      //   rzpayment.id,
      //   {
      //     transfers: [
      //       {
      //         account: paymentAccount.linkedAccount.id,
      //         amount: +rzpayment.amount - +rzpayment.amount * 0.08, //2% razorpay charges + 1% razorpay transfer charges + 5% website commission
      //         currency: rzpayment.currency,
      //         notes: {
      //           branch: rzpayment?.bank,
      //           name: rzpayment?.contact,
      //         },
      //         on_hold: 0,
      //         // on_hold_until: 1671222870
      //       },
      //     ],
      //   }
      // );

      //   console.log('transfers', response.data);
      // } catch (err) {
      //   console.log('ttander err', err.response.data);
      // }
      return updatedPayment;
    } else {
      await this.baseModel.findByIdAndUpdate(
        payment.id,
        {
          $set: {
            status: rzpayment.status === 'captured',
            'data.order': rzorder,
            'data.signatureVerified': false,
            'data.razorpayPaymentId': body.razorpayPaymentId,
          },
        },
        { new: true }
      );
      throw new HttpException(
        'Payment Verification Failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getPaymentByRzOrderId(rzorderId: string) {
    const payment = await this.baseModel.findOne({
      'data.order.id': rzorderId,
    });
    console.log('order', payment);
    return payment;
  }

  async getAllPaymentsByUser(userId) {
    return await this.baseModel
      .find({ user: userId })
      .populate('coupon user payee');
  }

  async getAllPaymentsByOwner(ownerId) {
    const payment = await this.baseModel
      .find({ payee: ownerId })
      .populate('coupon user payee');
    return payment;
  }

  async getPaymentDetailById(paymentId: string) {
    return await this.baseModel
      .findById(paymentId)
      .populate('coupon user payee');
  }

  async getRzPaymentDetailById(paymentId: string) {
    return await this.razorpayClient.payments.fetch(paymentId);
  }

  async initiateRefund(paymentId: string, speed: 'normal' | 'optimum') {
    const payment = await this.baseModel.findById(paymentId);
    if (!payment)
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);

    const rzorder = await this.razorpayClient.orders.fetch(payment.orderId);
    console.log('rzorder', rzorder, payment);

    if (rzorder.status != 'paid')
      throw new HttpException(
        `Payment cannot be refunded as the payment status is ${payment.data.order.status}`,
        HttpStatus.BAD_REQUEST
      );
    if (!payment.data.razorpayPaymentId)
      throw new HttpException(
        'Payment not completed. So Refund could not be processed',
        HttpStatus.BAD_REQUEST
      );

    try {
      await this.razorpayClient.payments.refund(
        payment.data.razorpayPaymentId,
        {
          amount: payment.data.order.amount,
          speed,
          receipt: payment.data.order.receipt,
        }
      );

      const rzpayment = await this.razorpayClient.payments.fetch(
        payment.data.razorpayPaymentId
      );
      const updatePayment = await this.baseModel.findByIdAndUpdate(
        payment.id,
        {
          $set: {
            refundStatus: rzpayment.refund_status,
            isRefunded: false,
          },
        },
        { new: true }
      );
      console.log('Refunded payment: ', updatePayment);
    } catch (err) {
      console.log('Initiate Refund Error', err);
      const rzpayment = await this.razorpayClient.payments.fetch(
        payment.data.razorpayPaymentId
      );
      await this.baseModel.findByIdAndUpdate(
        payment.id,
        {
          $set: {
            refundStatus: rzpayment.refund_status,
            isRefunded: false,
            refundFailReason: err?.message,
          },
        },
        { new: true }
      );
      throw new HttpException(
        'Payment Refund Error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return 'Payment Refund has been initiated successfully';
  }
}
