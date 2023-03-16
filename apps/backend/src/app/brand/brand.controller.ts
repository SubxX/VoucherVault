import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase.guard';
import { Brand } from './brand.schema';
import { BrandService } from './brand.service';
import { GetBrandReq } from './dto/brand.dto';

@ApiTags('-Brands')
@Controller({ path: 'brand', version: '1' })
export class BrandController {
  constructor(private baseService: BrandService) {}

  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllbrand(@Query() params: GetBrandReq): Promise<Brand[]> {
    return this.baseService.findAll(params);
  }

  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findbrand(@Param('id') id: string): Promise<Brand> {
    return this.baseService.findById(id);
  }

  @ApiCreatedResponse()
  @ApiBody({ type: GetBrandReq })
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Post('')
  async createbrand(@Body() body: GetBrandReq, @Req() req): Promise<Brand> {
    return this.baseService.create(body);
  }

  @ApiAcceptedResponse()
  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  async updatebrand(@Param('id') id: string, @Body() update: GetBrandReq) {
    return this.baseService.update(id, update);
  }

  @ApiAcceptedResponse()
  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  async deletebrand(@Param('id') id: string) {
    return await this.baseService.delete(id);
  }
}
