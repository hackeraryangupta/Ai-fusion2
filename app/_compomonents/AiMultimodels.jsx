import React, { useContext, useState } from 'react'
import AiModelList from '@/shared/AiModelList'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Lock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Aiselected } from '@/context/Aiselected'
import { useUser } from '@clerk/nextjs'
import { db } from '@/config/Firebase'
import { doc, setDoc } from "firebase/firestore"

function AiMultimodels() {
  const { user } = useUser();
  const [aimodellist, setaimodellist] = useState(AiModelList);
  const { aiselectedmodels = {}, setaiselectedmodels } = useContext(Aiselected) || {};

  // ✅ Toggle Model On/Off
  const onToggleChange = (modelName, value) => {
    setaimodellist(prev =>
      prev.map(m =>
        m.model === modelName ? { ...m, enable: value } : m
      )
    );
  };

  // ✅ Handle Selected Model and Save to Firestore
  const onSelectdValue = async (parentModel, value) => {
    if (!setaiselectedmodels) return; // guard

    const updatedModels = {
      ...aiselectedmodels,
      [parentModel]: { modelId: value },
    };

    setaiselectedmodels(updatedModels);

    // Save to Firebase
    try {
      if (user?.primaryEmailAddress?.emailAddress) {
        const docRef = doc(db, "users", user.primaryEmailAddress.emailAddress);
        await setDoc(docRef, { selectedModelPref: updatedModels }, { merge: true });
        console.log("✅ Model selection saved to Firestore!");
      }
    } catch (error) {
      console.error("❌ Error saving to Firestore:", error);
    }
  };

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aimodellist.map((model, index) => (
        <div
          key={index}
          className={`flex flex-col border-r h-full overflow-auto transition-all duration-300 ${
            model.enable ? 'flex-1 min-w-[400px]' : 'w-[100px] flex-none'
          }`}
        >
          {/* Header Section */}
          <div className="flex w-full h-[70px] items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {/* Model Selector */}
              {model.enable && (
                <Select
                  defaultValue={aiselectedmodels?.[model.model]?.modelId ?? ''}
                  onValueChange={(value) => onSelectdValue(model.model, value)}
                  disabled={model.premium}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="px-3">
                      <SelectLabel>Free</SelectLabel>
                      {model.subModel.map((submodel, i) =>
                        !submodel.premium && submodel.id ? (
                          <SelectItem key={i} value={submodel.id}>
                            {submodel.name}
                          </SelectItem>
                        ) : null
                      )}
                    </SelectGroup>

                    <SelectGroup className="px-3">
                      <SelectLabel>Premium</SelectLabel>
                      {model.subModel.map((submodel, i) =>
                        submodel.premium ? (
                          <SelectItem key={i} value={submodel.name} disabled>
                            {submodel.name}
                            <Lock className="h-4 w-4 ml-2 inline" />
                          </SelectItem>
                        ) : null
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Toggle / Enable Button */}
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

          {/* Premium Lock Section */}
          {model.premium && model.enable && (
            <div className="flex items-center justify-center h-full">
              <Button><Lock className="mr-2" />Upgrade to unlock</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AiMultimodels;
