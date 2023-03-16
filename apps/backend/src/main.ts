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
  Logger.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT || 3333}`
  );
}

bootstrap();
