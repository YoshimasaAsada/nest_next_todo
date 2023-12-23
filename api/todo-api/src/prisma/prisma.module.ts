import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  // 外部サービスの中でPrisnmaサービスを利用したいため
  // これああればたとえばAuthModuleから直でprismaサービス使う的なことが可能
})
export class PrismaModule {}
