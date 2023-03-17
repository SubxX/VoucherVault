import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TriggerNotificationBody {
  @ApiProperty()
  @IsString()
  templateName: string;

  @ApiProperty()
  @IsString()
  subscriberId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty()
  payload: any;
}

export class SetDeviceNotification {
  @ApiProperty()
  @IsString()
  subscriberId: string;

  @ApiProperty()
  tokens: string[];
}
