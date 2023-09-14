import { Github } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

export const Header: React.FC = () => {
  return (
    <header className='py-4 px-8 flex justify-between border-b'>
      <h2 className='text-xl font-bold'>upload.ai</h2>
      <div className='flex gap-4 justify-center items-center'>
        <p className='text-muted-foreground'>
          Desenvolvido com ❤️ no NLW da Rocketseat
        </p>
        <Separator
          orientation='vertical'
          className='h-6'
        />
        <Button variant='outline'>
          <Github />
          Github
        </Button>
      </div>
    </header>
  )
}
