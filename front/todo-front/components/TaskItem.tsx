import React, { useState } from 'react'
import { Task } from '@prisma/client'
import { FC } from 'react'
import useStore from '@/store'
import { useMutateTask } from '@/hooks/useMutateTask'
import { Button, List } from '@mantine/core'

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description,
}) => {
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  return (
    <List.Item>
      <div>
        <Button
          onClick={() => {
            update({
              id,
              title,
              description,
            })
          }}
        >
          更新
        </Button>
        <Button
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        >
          削除
        </Button>
        <span>{title}</span>
      </div>
    </List.Item>
  )
}
