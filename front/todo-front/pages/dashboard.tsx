import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button } from '@mantine/core'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_TODO_API_URL}/auth/logout`)
      router.push('/')
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <>
      <Layout title="Task Board">
        <Button onClick={logout}>ログアウト</Button>
      </Layout>
    </>
  )
}
export default Dashboard
