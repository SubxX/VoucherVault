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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediaService } from './media.service';
import { SupabaseAuthGuard } from '../auth/supabase.guard';
import {
  CreateMediaReq,
  CreateMediaReqBody,
  CreateMediaWithLinkReq,
  UpdateMediaReq,
} from './media.dto';
import { UsersService } from '../user/user.service';

@ApiTags('-Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private userService: UsersService
  ) {}

  @ApiCreatedResponse()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMediaReqBody })
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('')
  async uploadFile(@Req() req, @UploadedFile() file) {
    const media = new CreateMediaReq();
    const user = await this.userService.getById(req.user._id);
    media.user = user.id;
    return this.mediaService.uploadImage(file, media);
  }

  @ApiCreatedResponse()
  @ApiBody({
    type: CreateMediaWithLinkReq,
  })
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Post('/link')
  async createMediaLink(@Req() req, @Body() body: CreateMediaWithLinkReq) {
    const user = await this.userService.getById(req.user._id);
    body.user = user;
    const createMedia = await this.mediaService.createMediaWithLink(body);
    return createMedia;
  }

  @ApiCreatedResponse()
  @ApiOkResponse()
  @Patch('/:mediaId')
  async updateMedia(
    @Param('mediaId') id: string,
    @Body() update: UpdateMediaReq
  ) {
    return this.mediaService.update(id, update);
  }

  @ApiAcceptedResponse()
  @ApiOkResponse()
  @Delete('/:mediaId')
  async deleteMedia(@Param('mediaId') id: string) {
    return await this.mediaService.delete(id);
  }

  @ApiOkResponse()
  @Get('/:mediaId')
  async getMediaById(@Param('mediaId') id: string) {
    return await this.mediaService.findById(id);
  }

  @ApiOkResponse()
  @Get('/:url')
  async getMediaByUrl(@Param('url') url: string) {
    return await this.mediaService.findById(url);
  }
}
