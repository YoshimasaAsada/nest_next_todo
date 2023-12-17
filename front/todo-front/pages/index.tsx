import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AuthForm } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
      console.log(form)
      await axios.post(`${process.env.NEXT_PUBLIC_TODO_API_URL}/auth/signup`, {
        email: form.values.email,
        password: form.values.password,
      })
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
          <Button type="submit">ログイン</Button>
        </form>
      </Layout>
    </>
  )
}
