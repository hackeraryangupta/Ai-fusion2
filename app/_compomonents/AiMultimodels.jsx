import React, { useState } from 'react'
import AiModelList from '@/shared/AiModelList'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Lock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

function AiMultimodels() {
  const [aimodellist, setaimodellist] = useState(AiModelList)

  const onToggleChange = (modelName, value) => {
    setaimodellist(prev =>
      prev.map(m =>
        m.model === modelName ? { ...m, enable: value } : m
      )
    )
  }

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aimodellist.map((model, index) => (
        <div
          key={index}
          className={`flex flex-col border-r h-full overflow-auto transition-all duration-300 ${
            model.enable ? 'flex-1 min-w-[400px]' : 'w-[100px] flex-none'
          }`}
        >
          <div className="flex w-full h-[70px] items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={model.subModel[0].name} />
                  </SelectTrigger>
                  <SelectContent>
                    {model.subModel.map((submodel, i) => (
                      <SelectItem key={i} value={submodel.name}>
                        {submodel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div>
              {model.enable ? (
                <Switch
                  checked={model.enable}
                  onCheckedChange={v => onToggleChange(model.model, v)}
                />
              ) : (
                <MessageSquare
                  className="cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => onToggleChange(model.model, true)}
                />
              )}
            </div>
          </div>
         {model.premium && model.enable && <div className='flex items-center justify-center h-full'>
        <Button><Lock/>Upgrade to unlock</Button>
      </div>}
        </div>
      ))}
      
    </div>
  )
}

export default AiMultimodels
