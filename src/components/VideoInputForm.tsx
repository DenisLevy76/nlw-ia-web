import { FileVideo, Upload } from 'lucide-react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { api } from '@/lib/axios'
import classnames from 'classnames'

type Status =
  | 'Idle'
  | 'Converting'
  | 'Uploading'
  | 'Transcribing'
  | 'Success'
  | 'Error'
const statusMessage = {
  Idle: 'Carregar vídeo',
  Converting: 'Convertendo...',
  Uploading: 'Carregando...',
  Transcribing: 'Transcrevendo vídeo...',
  Success: 'Sucesso!',
  Error: 'Falha ao carregar.',
}
export const VideoInputForm: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('Idle')

  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (!files) return

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const convertVideoToAudio = async (video: File) => {
    console.log('Conversion started.')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', (log) => console.log(log))

    ffmpeg.on('progress', (progress) =>
      console.log('Convert progress:', Math.round(progress.progress * 100))
    )

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
    const audioFile = new File([audioFileBlob], 'output.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Conversion finished.')

    return audioFile
  }

  const handleVideoUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) return

    setStatus('Converting')
    const audioFile = await convertVideoToAudio(videoFile)

    const formDataFile = new FormData()
    formDataFile.append('file', audioFile)

    setStatus('Uploading')
    const { data } = await api.post('/videos', formDataFile)

    const videoId = data.video.id

    setStatus('Transcribing')
    const transcription = await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    })

    if (!transcription) {
      setStatus('Error')
      return
    }

    setStatus('Success')
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleVideoUpload}>
      <Label
        htmlFor='video'
        className='border w-full aspect-video flex rounded-md cursor-pointer border-dashed text-muted-foreground flex-col gap-2 items-center justify-center hover:bg-primary/5'
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className='pointer-events-none'
          />
        ) : (
          <>
            <FileVideo />
            Carregar vídeo
          </>
        )}
      </Label>
      <input
        type='file'
        name='video'
        id='video'
        accept='video/mp4'
        className='sr-only'
        onChange={handleFileSelected}
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
        ref={promptInputRef}
      />

      <Button
        className={classnames('w-full mt-4', {
          'bg-secondary': status !== 'Idle',
          'bg-green-500': status === 'Success',
          'bg-red-500': status === 'Error',
        })}
        type='submit'
        disabled={status !== 'Idle'}
      >
        {status === 'Idle' ? (
          <>
            Carregar vídeo
            <Upload
              className='ml-2'
              size={16}
            />
          </>
        ) : (
          <>{statusMessage[status]}</>
        )}
      </Button>
    </form>
  )
}
