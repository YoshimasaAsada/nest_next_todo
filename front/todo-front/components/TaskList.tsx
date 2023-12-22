import { useQueryTasks } from '../hooks/useQueryTasks'
import { List, ThemeIcon, Loader } from '@mantine/core'
import { TaskItem } from './TaskItem'

export const TaskList = () => {
  const { data: tasks, status } = useQueryTasks()
  if (status === 'loading') return <Loader my="lg" color="cyan" />
  return (
    <List my="lg" spacing="sm" size="sm">
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </List>
  )
}
