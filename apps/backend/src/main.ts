import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Voucher Vault Api Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.enableCors();
  await app.listen(process.env.PORT || 3333);
  if (process.env.ENV == 'dev') {
    Logger.log(
      `🚀 Application is running on: ${process.env.PROTOCOL}://${
        process.env.HOST
      }:${process.env.PORT || 3333}`
    );
  } else {
    Logger.log(
      `🚀 Application is running on: ${process.env.PROTOCOL}://${process.env.HOST}`
    );
  }
}

bootstrap();
