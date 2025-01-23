import React, { useState } from 'react'
import Input from '../../../auth/form/components/Input'
import {
  BookOpenIcon,
  Briefcase,
  ChartPie,
  Flame,
  Heart,
  PlayIcon,
  ShieldCheck,
  TagIcon,
  Users,
} from 'lucide-react'
import ClickableButton from '../../components/ClickableButton'
import {
  AcademicCapIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CubeIcon,
  FaceSmileIcon,
  GlobeAltIcon,
  LightBulbIcon,
  MicrophoneIcon,
  PhotoIcon,
  RocketLaunchIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'

const AddEvent = () => {
  const [data, setData] = useState({})
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleClick = (type) => {
    setTags((prev) => {
      if (prev.includes(type)) {
        return prev.filter((tag) => tag !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  return (
    <div className="w-full flex justify-center">
      <div className="h-auto mb-2 border-neutral-500/50 w-[80%] bg-neutral-800/20 rounded border text-white p-4 mt-10">
        <div className="flex flex-col items-center">
          <div className="font-semibold text-lg mb-8">
            Enter the Event details below
          </div>
          <div className="mb-8">
            <div className="text-sm text-slate-400">
              What's the event about?
            </div>
            <Input
              placeholder="Title"
              id="title"
              name="title"
              onChange={handleChange}
              type="text"
              value={data.title}
            />
            <Input
              placeholder="Description"
              id="description"
              name="description"
              onChange={handleChange}
              type="text"
              value={data.description}
            />
          </div>

          <div>
            <div className="text-sm text-slate-400 flex flex-row gap-2">
              Choose a Category
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-3 md:gap-6 mt-4">
              <ClickableButton type="General" handleClick={handleClick}>
                <Squares2X2Icon className="h-5 w-5" />
              </ClickableButton>
              <ClickableButton type="Professional" handleClick={handleClick}>
                <Briefcase className="h-5 w-5" />
              </ClickableButton>
              <ClickableButton type="Popular" handleClick={handleClick}>
                <Flame className="h-5 w-5" />
              </ClickableButton>
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-400 flex flex-row gap-2">
              Select Relevant Tags
              <TagIcon />
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-3 md:gap-6 mt-4">
              <ClickableButton type="Charity" handleClick={handleClick}>
                <Heart className="h-5 w-5" />
              </ClickableButton>
              <ClickableButton type="Networking" handleClick={handleClick}>
                <Users className="h-5 w-5" />
              </ClickableButton>
              <ClickableButton type="Education" handleClick={handleClick}>
                <BookOpenIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Wellness" handleClick={handleClick}>
                <FaceSmileIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Arts" handleClick={handleClick}>
                <PhotoIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Culture" handleClick={handleClick}>
                <GlobeAltIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Blockchain" handleClick={handleClick}>
                <CubeIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Cybersecurity" handleClick={handleClick}>
                <ShieldCheck className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Startups" handleClick={handleClick}>
                <RocketLaunchIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Workshop" handleClick={handleClick}>
                <Cog6ToothIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Data-Science" handleClick={handleClick}>
                <ChartPie className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Fitness" handleClick={handleClick}>
                <ChatBubbleBottomCenterIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Technology" handleClick={handleClick}>
                <AcademicCapIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Movies" handleClick={handleClick}>
                <CodeBracketIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Gaming" handleClick={handleClick}>
                <MicrophoneIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Cooking" handleClick={handleClick}>
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
              <ClickableButton type="Nature" handleClick={handleClick}>
                <LightBulbIcon className="h-5 w-5 text-inherit" />
              </ClickableButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
