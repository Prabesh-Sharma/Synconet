import React, { useState } from 'react'
import Input from '../../../auth/form/components/Input'
import EventLists from './events.json'
import {
  BookOpenIcon,
  Briefcase,
  ChartPie,
  Flame,
  Heart,
  Icon,
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
  // console.log(EventLists.eventArray)
  const [data, setData] = useState({})

  const [category, setCategory] = useState('General')
  const generalIcons = EventLists.eventArray.filter(
    (e) => e.category === 'General'
  )
  console.log(generalIcons[0].tags)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const [icons, setIcons] = useState(generalIcons[0].tags)
  console.log('the icons are ' + icons)

  const handleClick = (type) => {
    setTags((prev) => {
      if (prev.includes(type)) {
        return prev.filter((tag) => tag !== type)
      } else {
        return [...prev, type]
      }
    })
  }
  const handleToggling = (e) => {
    setCategory(e)
    console.log(e)
    relevantIcons(e)
  }
  const relevantIcons = (category) => {
    const tempIcons = EventLists.eventArray.filter(
      (e) => e.category === category
    )
    setIcons(tempIcons[0].tags)
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
              <ClickableButton
                type="General"
                handleClick={(e) => handleToggling('General')}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </ClickableButton>
              <ClickableButton
                type="Professional"
                handleClick={(e) => handleToggling('Professional')}
              >
                <Briefcase className="h-5 w-5" />
              </ClickableButton>
              <ClickableButton
                type="Popular"
                handleClick={(e) => handleToggling('Popular')}
              >
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
              {icons.map((e) => (
                <button className="h-100 w-100 bg-red-800" key={e.heroicons}>
                  {e.heroicons}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
