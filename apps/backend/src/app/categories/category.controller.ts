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
import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { GetCategoryReq } from './dto/categories.dto';

@ApiTags('-Category')
@Controller({ path: 'category', version: '1' })
export class CategoryController {
  constructor(private baseService: CategoryService) {}

  @ApiOkResponse()
  @Get()
  async findAllcategory(@Query() params: GetCategoryReq) {
    const cat = await this.baseService.findAll(params);
    return cat;
  }

  @ApiOkResponse()
  @Get('/:id')
  async findcategory(@Param('id') id: string): Promise<Category> {
    return this.baseService.findById(id);
  }

  @ApiCreatedResponse()
  @ApiBody({ type: GetCategoryReq })
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Post('')
  async createcategory(
    @Body() body: GetCategoryReq,
    @Req() req
  ): Promise<Category> {
    return this.baseService.create(body);
  }

  @ApiAcceptedResponse()
  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  async updatecategory(
    @Param('id') id: string,
    @Body() update: GetCategoryReq
  ) {
    return this.baseService.update(id, update);
  }

  @ApiAcceptedResponse()
  @ApiOkResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  async deletecategory(@Param('id') id: string) {
    return await this.baseService.delete(id);
  }
}
