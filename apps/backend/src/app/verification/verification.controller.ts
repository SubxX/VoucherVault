import {
  Body,
  Controller,
  Delete,
  UseGuards,
  Get,
  Post,
  Patch,
  Param,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase.guard';
import { AadharService } from './aadhar/aadhar.service';

@ApiTags('-Verification')
@Controller('verification')
export class VerificationController {
  constructor(
    private aadharService: AadharService // private userService: UsersService
  ) {}

  @ApiCreatedResponse()
  // @ApiBearerAuth()
  // @UseGuards(SupabaseAuthGuard)
  @Post('aadhar/generate/:adharNumber')
  async generateOtp(@Req() req, @Param('adharNumber') adharNumber: string) {
    console.log('generating', adharNumber);
    if (adharNumber.toString().length != 12) {
      throw new HttpException('Invalid Aadhar Number', HttpStatus.BAD_REQUEST);
    }
    const response = await this.aadharService.generateOtp(adharNumber);
    return response;
  }

  @ApiCreatedResponse()
  // @ApiBearerAuth()
  // @UseGuards(SupabaseAuthGuard)
  @Post('aadhar/submit/:transactionId/:shareCode/:otp')
  async submitOtp(
    @Req() req,
    @Param('otp') otp: number,
    @Param('shareCode') sharecode: number,
    @Param('transactionId') transactionId: string
  ) {
    if (otp.toString().length != 6) {
      throw new HttpException('Invalid otp', HttpStatus.BAD_REQUEST);
    }
    if (sharecode.toString().length != 4) {
      throw new HttpException('Invalid sharecode', HttpStatus.BAD_REQUEST);
    }
    const response = await this.aadharService.submitOtp(
      otp,
      sharecode,
      transactionId,
      req
    );
    return response;
  }
}
