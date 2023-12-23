import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
// クライアントから送られてくるデータに対してのバリデーション
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
