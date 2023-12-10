// authサービスで使用するデータのデータ型定義
export interface Msg {
  message: string;
}

export interface Csrf {
  csrfToken: string;
}

export interface Jwt {
  accessToken: string;
}
