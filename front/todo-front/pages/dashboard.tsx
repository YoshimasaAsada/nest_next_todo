import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button } from '@mantine/core'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { UserInfo } from '@/components/UserInfo'
import { useQueryClient } from '@tanstack/react-query'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = async () => {
    try {
      queryClient.removeQueries(['tasks'])
      queryClient.removeQueries(['user'])
      // ログアウト時にキャッシュを消す
      await axios.post(`${process.env.NEXT_PUBLIC_TODO_API_URL}/auth/logout`)
      router.push('/')
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <>
      <Layout title="Task Board">
        <UserInfo />
        <TaskForm />
        <TaskList />
        <Button onClick={logout}>ログアウト</Button>
      </Layout>
    </>
  )
}
export default Dashboard
