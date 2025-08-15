import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// ------------------------------------------------ Bootstrap Function ---------------------------------------------//
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  
  // ------------------------------------------------ Middleware Setup ---------------------------------------------//
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // ------------------------------------------------ Swagger Documentation ---------------------------------------------//
  const config = new DocumentBuilder()
    .setTitle('Octopod API')
    .setDescription('Podcast search API using iTunes')
    .setVersion('1.0')
    .addTag('podcasts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ------------------------------------------------ Server Startup ---------------------------------------------//
  await app.listen(3001, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
