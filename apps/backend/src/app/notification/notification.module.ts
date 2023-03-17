import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  imports: [],
  providers: [NotificationService],
  controllers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
