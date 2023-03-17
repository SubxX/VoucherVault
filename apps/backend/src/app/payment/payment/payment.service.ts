import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRazorpay } from 'nestjs-razorpay';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { VerifyPaymentReq } from './payment.dto';
import { PaymentIntent, PaymentIntentDocument } from './payment-intent.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { paymentGatewayCreds } from '@backend/common/payment-gateway.config';

@Injectable()
export class PaymentService {
  // private instance = new Razorpay({
  //   key_id: '',
  //   key_secret: '',
  // });

  constructor(
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
    @InjectModel(PaymentIntent.name)
    private baseModel: Model<PaymentIntentDocument>
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
      console.log('payment verified');

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

  async getAllPaymentsByUser(userId) {
    return await this.baseModel.find({ user: userId }).populate('coupon user');
  }

  async getPaymentDetailById(paymentId: string) {
    return await this.baseModel.findById(paymentId).populate('coupon user');
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
