import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AadharService } from './aadhar/aadhar.service';
import { VerificationController } from './verification.controller';

@Module({
  imports: [UsersModule],
  providers: [AadharService],
  controllers: [VerificationController],
  exports: [AadharService],
})
export class VerificationModule {}
