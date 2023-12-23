import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// dtoのクラスバリデーションを使うため
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
// クッキーを取り出すために必要
import * as csurf from 'csurf';
// csrfの利用

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // dtoのために必要。データ型で定義していない物は弾く

  app.enableCors({
    credentials: true,
    // クッキーベースの際に必要
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
