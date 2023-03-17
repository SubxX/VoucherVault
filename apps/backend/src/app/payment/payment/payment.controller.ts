import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderReq } from './order.dto';
import { VerifyPaymentReq } from './payment.dto';
import { OrderService } from './order.service';
import { PaymentService } from './payment.service';
import uniqid from 'uniqid';
import { SupabaseAuthGuard } from '@backend/app/auth/supabase.guard';

@ApiTags('-Payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService
  ) {}

  /****************************** ORDERS ***************************************/
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Post('create-order')
  async createOrder(@Body() body: CreateOrderReq, @Req() req) {
    body.receipt = body.receipt || 'order_receipt';
    body.currency = body.currency || 'INR';
    body.receipt = uniqid('receipt_');
    console.log('body', body);
    const order = await this.orderService.createOrder(body, req);
    return order;
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Get('/rz-order/:id')
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Get('/payments-user/:userId')
  async getAllPaymentForUser(@Param('userId') userId: string) {
    return await this.orderService.getAllPaymentForUser(userId);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Get('/payment-owners/:userId')
  async getAllPayment(@Param('userId') userId: string) {
    return await this.orderService.getAllPayment(userId);
  }

  /****************************** PAYMENTS ***************************************/
  @ApiCreatedResponse()
  @Post('verify-payment')
  async verifyPayment(@Body() body: VerifyPaymentReq) {
    return await this.paymentService.paymentVerification(body);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiCreatedResponse()
  @Post('initiate-refund/:paymentId/:speed')
  async initateRefund(
    @Param('speed') speed: 'normal' | 'optimum',
    @Param('paymentId') paymentId: string
  ) {
    return await this.paymentService.initiateRefund(paymentId, speed);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse()
  @Get('')
  async getAllPaymentsByUser(@Req() req) {
    return await this.paymentService.getAllPaymentsByUser(req.user._id);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse()
  @Get('/:id')
  async getPaymentDetailById(@Param('id') id: string) {
    return await this.paymentService.getPaymentDetailById(id);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse()
  @Get('/rz-payment/:id')
  async getRazorpayPaymentDetailById(@Param('id') id: string) {
    return await this.paymentService.getRzPaymentDetailById(id);
  }
}
