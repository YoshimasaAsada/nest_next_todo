import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AuthForm } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isRegister, setIsRegister] = useState(false)
  const form = useForm<AuthForm>({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()
  // handleSubmit内ではだめ

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_TODO_API_URL}/auth/signup`,
          {
            email: form.values.email,
            password: form.values.password,
          }
        )
      }
      await axios.post(`${process.env.NEXT_PUBLIC_TODO_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      })
      form.reset()
      router.push('/dashboard')
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <>
      <Layout title="Auth">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput id="email" {...form.getInputProps('email')} />
          <PasswordInput id="password" {...form.getInputProps('password')} />
          <Button type="submit">{isRegister ? 'ログイン' : '新規登録'}</Button>
        </form>
        <Anchor
          component="button"
          type="button"
          onClick={() => {
            setIsRegister(!isRegister)
          }}
        >
          {isRegister ? 'loginへ' : '新規登録へ'}
        </Anchor>
      </Layout>
    </>
  )
}
