import React from 'react'
import axios from 'axios'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useStore from '@/store'
import { EditedTask } from '@/types'
import { Task } from '@prisma/client'

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    async (task: Omit<EditedTask, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}/todo`,
        task
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previosTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previosTodos) {
          queryClient.setQueryData(['tasks'], [res, ...previosTodos])
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403)
          router.push('/')
      },
    }
  )

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_TODO_API_URL}/todo/${task.id}`,
        task
      )
      return res.data
    },
    {
      onSuccess: (res, variables) => {
        const previosTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previosTodos) {
          queryClient.setQueryData(
            ['tasks'],
            previosTodos.map((task) => (task.id === res.id ? res : task))
          )
        }
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.responce.status === 403) {
          router.push('/')
        }
      },
    }
  )

  const deleteTaskMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_TODO_API_URL}/todo/${id}`)
    },
    {
      onSuccess: (_, variables) => {
        const previosTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previosTodos) {
          queryClient.setQueryData(
            ['tasks'],
            previosTodos.filter((task) => task.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.responce.status === 403) {
          router.push('/')
        }
      },
    }
  )
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
