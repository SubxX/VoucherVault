import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class CreateMediaReqBody {
  @ApiProperty({ type: 'file', format: 'binary' })
  file;
}

export class CreateMediaReq {
  @ApiProperty({ required: false })
  @MinLength(2)
  name: string;

  @ApiProperty({ required: false })
  url: string;

  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ required: false })
  mime: string;

  @ApiProperty({ required: false })
  size: number;

  @ApiProperty({ required: false })
  public: boolean;

  @ApiProperty({ required: false })
  altText: string;

  @ApiProperty({ required: false })
  ext: string;

  @ApiProperty({ required: false })
  provider: string;

  @ApiProperty({ required: false })
  providerMetadata;

  @ApiProperty({ required: false })
  @IsOptional()
  user;
}

export class CreateMediaWithLinkReq {
  @ApiProperty({ required: false })
  @MinLength(2)
  name?: string;

  @ApiProperty({ required: false })
  url?: string;

  @ApiProperty({ required: false })
  type?: string;

  @ApiProperty({ required: false })
  mime?: string;

  @ApiProperty({ required: false })
  size?: number;

  @ApiProperty({ required: false })
  public?: boolean;

  @ApiProperty({ required: false })
  altText?: string;

  @ApiProperty({ required: false })
  provider?: string;

  @ApiProperty({ required: false })
  providerMetadata?;

  @ApiProperty({ required: false })
  @IsOptional()
  user?;
}

export class UpdateMediaReq {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  altName: string;
}
