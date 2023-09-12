import { FileVideo, Github, Upload, Wand2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Slider } from './components/ui/slider'

export const App = () => {
  return (
    <div className='flex flex-col min-h-screen leading-relaxed'>
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
          <p className='text-muted-foreground text-sm mt-4'>
            lembre-se: você pode utilizar a variável{' '}
            <code className='text-violet-400'>{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </section>
        <aside className='flex-1 max-w-md'>
          <form>
            <Label
              htmlFor='video'
              className='border w-full aspect-video flex rounded-md cursor-pointer border-dashed text-muted-foreground flex-col gap-2 items-center justify-center hover:bg-primary/5'
            >
              <FileVideo />
              Carregar vídeo
            </Label>
            <input
              type='file'
              name='video'
              id='video'
              accept='video/mp4'
              className='sr-only'
            />
            <Separator className='my-6' />
            <Label
              htmlFor='prompt-transcription'
              className='flex mb-4'
            >
              Prompt de transcrição
            </Label>
            <Textarea
              id='prompt-transcription'
              placeholder='Ex.: ESlint, Tailwind, Reactjs, Typescript'
            />

            <Button
              className='w-full mt-4'
              type='submit'
            >
              Carregar vídeo
              <Upload
                className='ml-2'
                size={16}
              />
            </Button>
          </form>

          <form>
            <Separator className='my-6' />
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
