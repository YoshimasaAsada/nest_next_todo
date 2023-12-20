import React from 'react'
import { Loader } from '@mantine/core'
import { useQueryUser } from '@/hooks/useQueryUser'

export const UserInfo = () => {
  const { data: user, status } = useQueryUser()
  if (status === 'loading') return <Loader />
  return <div>{user?.email}</div>
}
