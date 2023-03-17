import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MediaModule } from '../media/media.module';
import { NotificationModule } from '../notification/notification.module';
import { UsersModule } from '../user/user.module';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  imports: [MediaModule, NotificationModule, PassportModule, UsersModule],
  controllers: [],
  providers: [SupabaseStrategy],
  exports: [SupabaseStrategy],
})
export class AuthModule {}
