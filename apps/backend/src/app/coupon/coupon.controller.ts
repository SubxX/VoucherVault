import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase.guard';
import { Coupon } from './coupon.schema';
import { CouponService } from './coupon.service';
import {
  CouponDto,
  FindCouponQuery,
  SearchCouponQuery,
} from './dto/coupon.dto';
import { CreateCouponDto } from './dto/create-coupon.dto';

@ApiTags('-Coupons')
@Controller({ path: 'coupon', version: '1' })
export class CouponController {
  constructor(private baseService: CouponService) {}
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiCreatedResponse()
  @Post()
  createCoupon(@Body() body: CreateCouponDto, @Request() req) {
    body.createdBy = req.user._id;
    return this.baseService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiCreatedResponse()
  @Patch('/:id')
  async updateCoupon(@Param('id') id: string, @Body() body: CreateCouponDto) {
    return await this.baseService.update(id, body);
  }

  // @ApiBearerAuth()
  // @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse({ type: [CouponDto] })
  @Get()
  findAll(@Query() query: FindCouponQuery): Promise<Coupon[]> {
    return this.baseService.find(query);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse({ type: [CouponDto] })
  @Get('/my-coupons')
  findAllByUser(
    @Req() req,
    @Query() query: FindCouponQuery
  ): Promise<Coupon[]> {
    console.log(req.createdBy);
    query.createdBy = req.user._id;
    return this.baseService.findMyCoupons(query);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse({ type: [CouponDto] })
  @Get('search')
  search(@Query() query: SearchCouponQuery): Promise<Coupon[]> {
    return this.baseService.search(query);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse({ type: CouponDto })
  @Get('/:id')
  findById(@Param('id') id: string): Promise<Coupon> {
    return this.baseService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOkResponse({ type: CouponDto })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.baseService.deleteCoupon(id);
  }
}
