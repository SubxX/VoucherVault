import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CretaeLinkedAccountReq {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: number;

  @ApiProperty()
  legalBusinessName: string;

  @ApiProperty()
  contactName: string;

  @ApiProperty()
  @IsOptional()
  category?: string;

  @ApiProperty()
  @IsOptional()
  subcategory?: string;

  @ApiProperty()
  @IsString()
  streetAddress1: string;

  @ApiProperty()
  @IsString()
  streetAddress2: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty({ default: 'India' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsOptional()
  pan?: string;

  @ApiProperty()
  @IsOptional()
  gst?: string;

  @ApiProperty()
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsNumber()
  accountNumber: number;

  @ApiProperty()
  ifscCode: string;

  @ApiProperty()
  @IsOptional()
  tnc: boolean;
}

export class SetProductConfigReq {
  @ApiProperty()
  product_name: string;

  @ApiProperty()
  tnc_accepted: boolean;
}
