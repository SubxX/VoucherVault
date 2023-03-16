import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinDate,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsDate()
  @MinDate(new Date())
  validUpto?: Date;

  @ApiProperty()
  @IsNumber()
  expiresIn?: number;

  @ApiProperty({ type: String, enum: ['PERCENT', 'AMOUNT'] })
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  commisionPercent?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  commissionAmount?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  categories?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  currency?: string;

  createdBy?: any;

  @ApiProperty()
  @IsOptional()
  media?: any;
}
