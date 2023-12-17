import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// リアクトクエリてなんだ
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  // フロントとバックエンドでcookieのやりとりをする場合は必要

  useEffect(() => {
    const getCsrfToken = async () => {
      console.log(process.env)
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}/auth/csrf`
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  // アプリがロードされた時にcsrfトークンを取得したい
  // 上記二つで自動でcsrfトークンがヘッダーに組み込まれた状態になる

  // const { Component, pageProps } = props
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
            fontFamily: 'Verdana, sans-selif',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
