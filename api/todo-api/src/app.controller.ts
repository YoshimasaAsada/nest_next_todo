import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    // appコントローラ（このコントローラ）の中にあるappServiceのgetHelloメソッドを呼び出す
  }

  @Get(`test`)
  findAuthor(): string {
    return 'author1';
  }
}
