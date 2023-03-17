import { SupabaseAuthGuard } from '@backend/app/auth/supabase.guard';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CretaeLinkedAccountReq, SetProductConfigReq } from './account.dto';
import { PaymentAccountService } from './payment-account.service';

@ApiTags('-Payment Accounts')
@Controller('payments-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  /****************************** LINKED ACCOUNT SERVICE ***************************************/
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse()
  @Get('linked-account/:accountId')
  async fetchLinkedAccount(@Param('accountId') accountId: string) {
    return await this.paymentAccountService.fetchLinkedAccount(accountId);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse()
  @Get('product-config/:accountId/products/:productConfigId')
  async fetchProductConfig(
    @Param('accountId') accountId: string,
    @Param('productConfigId') productConfigId: string
  ) {
    return await this.paymentAccountService.fetchProductConfig(
      accountId,
      productConfigId
    );
  }

  /*********************** USER LINKED ACCOUNT SERVICE ****************************/
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiCreatedResponse()
  @Post('account')
  async createUserLinkedAccount(
    @Body() body: CretaeLinkedAccountReq,
    @Req() req
  ) {
    return await this.paymentAccountService.createCompleteLinkedAccount(
      body,
      req
    );
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse({})
  @Get('account')
  findById(@Req() req) {
    console.log('rrr', req.user);
    return this.paymentAccountService.fetchPaymentAccount(req.user._id);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiCreatedResponse()
  @Patch('account/:accountId')
  async updateUserLinkedAccount(
    @Param('accountId') accountId: string,
    @Body() body
  ) {
    return await this.paymentAccountService.updatePaymentAccount(
      accountId,
      body
    );
  }
}
