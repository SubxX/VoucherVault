import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { UsersModule } from './user/user.module';

console.log('mkdsa', process.env.DB_URI);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    MediaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
