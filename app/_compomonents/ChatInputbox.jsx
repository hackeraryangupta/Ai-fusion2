import { Button } from '@/components/ui/button'
import { Mic, Paperclip, Send } from 'lucide-react'
import React from 'react'
import AiMultimodels from './AiMultimodels'

function ChatInputbox() {
  return (
    <div className='relaive min-h-screen'>
    {/* {page content} */}
      <div>
      <AiMultimodels/>

      </div>
      {/* {fixed chat input} */}
      <div className='fixed bottom-0 flex left-0 w-full justify-center px-4 pb-4'>
        <div className='w-full border rounded-xl shadow-md max-w-2xl p-4'>
            <input type='text' placeholder='Ask me anything..' className='border-0 outline-none'/>
        
        <div className='mt-3 flex justify-between items-center'>
            <Button className={''} variant={'ghost'} size={'icon'}><Paperclip className='h-5 w-5'/></Button>
        </div>
        </div>
        <div className='flex gap-5'>
            <Button  variant={'ghost'} size={'icon'}><Mic/></Button>
            <Button   size={'icon'} className={'bg-blue-600'}><Send/></Button>
        </div>
      </div>
    </div>
  )
}

export default ChatInputbox
