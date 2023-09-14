import { Wand2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Slider } from './components/ui/slider'
import { VideoInputForm } from './components/VideoInputForm'
import { Header } from './components/Header'

export const App = () => {
  return (
    <div className='flex flex-col min-h-screen leading-relaxed'>
      <Header />

      <main className='flex flex-1 gap-6 py-4 px-8'>
        <section className='flex flex-1 flex-col gap-4'>
          <Textarea
            className='resize-none flex-1'
            placeholder='Inclua o prompt para a IA...'
          />
          <Textarea
            className='resize-none flex-1'
            placeholder='Resultado gerado pela IA.'
            readOnly
          />
          <p className='text-muted-foreground text-sm'>
            lembre-se: você pode utilizar a variável{' '}
            <code className='text-violet-400'>{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </section>
        <aside className='flex-1 max-w-md'>
          <VideoInputForm />

          <Separator className='my-6' />

          <form>
            <Label
              htmlFor='prompt'
              className='flex mb-3'
            >
              Prompt
            </Label>
            <Select>
              <SelectTrigger
                className='w-full'
                id='prompt'
              >
                <SelectValue placeholder='Selecione um prompt' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='title'>Titulo para o Youtube</SelectItem>
                <SelectItem value='description'>
                  Descrição para o Youtube
                </SelectItem>
              </SelectContent>
            </Select>
            <Label
              htmlFor='model'
              className='flex mb-3 mt-6'
            >
              Model
            </Label>
            <Select>
              <SelectTrigger
                className='w-full'
                id='model'
                defaultValue={'gpt3.5'}
                disabled
              >
                <SelectValue placeholder='Selecione o motor GPT' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
              </SelectContent>
            </Select>
            <p className='text-muted-foreground text-sm mt-2 italic'>
              Você poderá customizar esta opção em breve.
            </p>

            <Separator
              id='temperature'
              className='my-6'
            />

            <span className='flex justify-between items-center'>
              <Label
                htmlFor='temperature'
                className='flex mb-3'
              >
                Temperatura
              </Label>
              <p className='text-muted-foreground text-sm mt-4'>0.5</p>
            </span>
            <Slider
              step={0.1}
              max={1}
              min={0}
            />
            <p className='text-muted-foreground text-sm mt-4 italic'>
              Valores mais altos tendem a deixar o resultado mais criativo e com
              possíveis erros.
            </p>

            <Separator
              id='temperature'
              className='my-6'
            />

            <Button
              className='w-full'
              type='submit'
            >
              Executar{' '}
              <Wand2
                className='ml-2'
                size={16}
              />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
