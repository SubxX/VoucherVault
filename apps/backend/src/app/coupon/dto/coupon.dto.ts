import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CouponDto {
  code: string;
  validUpto?: Date;
  expiresIn?: number;
  type: string;
  value: number;
  description: string;
  commisionPercent?: boolean;
  commissionAmount?: string;
  isVerified?: boolean;
  categories?: string[];
  link?: string;
  createdBy?: any;
  medias?: any;
}

export class FindCouponQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  size?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  category?: [string];

  @ApiProperty({ required: false })
  @IsOptional()
  brand?: [string];

  @ApiProperty({ required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sort?: string;
}

export class SearchCouponQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  size?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sort?: string;
}
