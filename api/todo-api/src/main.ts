import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // dtoのために必要
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:4000'],
  });
  // クロスオリジンの設定フロントエンドのドメインを設定
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );
  // フロントから受け取ったCokkieを解析できるようにしたやつ
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
