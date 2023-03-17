import { CouponService } from '@backend/app/coupon/coupon.service';
import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectRazorpay } from 'nestjs-razorpay';
import Razorpay from 'razorpay';
import { PaymentAccountService } from '../account/payment-account.service';
import { PaymentIntent, PaymentIntentDocument } from './payment-intent.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
    @InjectModel(PaymentIntent.name)
    private baseModel: Model<PaymentIntentDocument>,
    private couponService: CouponService,
    private accountService: PaymentAccountService
  ) {}

  async createOrder(body, req) {
    const coupon = await this.couponService.findById(body?.couponId);
    if (!coupon)
      throw new HttpException('Coupon not found', HttpStatus.BAD_REQUEST);
    const amount = 2 * 100;
    const transferAmount = amount - amount * 0.1;

    const paymentAcocunt = await this.accountService.fetchPaymentAccount(
      req.user._id
    );

    let transfers;
    if (paymentAcocunt?.linkedAccount) {
      transfers = [
        {
          account: paymentAcocunt?.linkedAccount?.id,
          amount: transferAmount, //2% razorpay charges + 1% razorpay transfer charges + 7% website commission = 10%;
          currency: 'INR',
          notes: {
            // branch: 'Acme Corp Bangalore North',
            name: paymentAcocunt?.linkedAccount?.legal_business_name,
          },
          linked_account_notes: ['name'],
          on_hold: 0,
          // on_hold_until: 1671222870
        },
      ];
    }
    let order;
    try {
      order = await this.razorpayClient.orders.create({
        amount: amount,
        currency: body.currency,
        receipt: body.receipt,
        transfers,
        // customer_id: 'cust_LQ56YzLZiqXBXU',
      });
      console.log('order', order);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Unable to Create Order. Please try again later. If problem persist contact support team',
        422
      );
    }
    const paymentPayload = {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      user: req.user._id,
      data: {
        order: order,
      },
    };
    const pay = await this.baseModel.create(paymentPayload);
    return pay;
  }

  async getOrderById(orderId: string) {
    const payments = await this.razorpayClient.orders.fetch(orderId);
    return payments;
  }

  async getAllPaymentForUser(@Param('userId') userId: string) {
    const payments = await this.baseModel
      .find({ user: userId })
      .populate('coupon');

    for (const payment of payments) {
      const rzorder = await this.razorpayClient.orders.fetch(
        payment?.data?.order?.id
      );
      if (rzorder.status == 'paid') {
        const coupon = await this.couponService.revealCouponCode(
          payment.coupon
        );
        payment.coupon = coupon;
      }
    }
    return payments;
  }

  async getAllPayment(@Param('userId') userId: string) {
    const payments = await this.baseModel.find().populate({
      path: 'coupon',
      match: { payee: userId },
    });

    return payments;
  }
}
