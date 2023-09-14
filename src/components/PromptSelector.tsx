import { useQuery } from 'react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { api } from '@/lib/axios'

export interface IPrompt {
  id: string
  title: string
  template: string
}

interface IResponse {
  data: IPrompt[]
}

export interface IPromptSelectorProps {
  onPromptSelected: (value: string) => void
}

export const PromptSelector: React.FC<IPromptSelectorProps> = ({
  onPromptSelected,
}) => {
  const { data: prompts } = useQuery(
    'prompts',
    async (): Promise<IResponse> => await api.get('/prompts'),
    { cacheTime: 2000000 }
  )

  return (
    <Select
      onValueChange={(value) => {
        const selectedPrompt = prompts?.data.find(
          (prompt) => prompt.id === value
        )

        if (!selectedPrompt) {
          return
        }

        onPromptSelected(selectedPrompt.template)
      }}
    >
      <SelectTrigger
        className='w-full'
        id='prompt'
      >
        <SelectValue placeholder='Selecione um prompt' />
      </SelectTrigger>
      <SelectContent>
        {prompts?.data.map((prompt) => (
          <SelectItem
            key={prompt.id}
            value={prompt.title}
          >
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
