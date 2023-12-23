import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // 個別のモジュールでインポートしなくても自動で使える
    AuthModule,
    UserModule,
    TodoModule,
    PrismaModule,
  ],
  // 外部のモジュールを使いたい場合に作成する
  controllers: [AppController],
  // このモジュールの中でAppコントローラを使う
  providers: [AppService],
  // このコントローラの中でappサービスを使いたい,
})
export class AppModule {}
