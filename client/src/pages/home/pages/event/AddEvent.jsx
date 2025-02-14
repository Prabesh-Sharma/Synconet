import React, { useState, useEffect } from 'react'
import Input from '../../../auth/form/components/Input'
import EventLists from './events.json'
import ClickableButton from '../../components/ClickableButton'
import CategoryBtn from '../../components/CategoryButton'
import {
  AcademicCapIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  UserGroupIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  PlayIcon,
  BriefcaseIcon,
  HeartIcon,
  BookOpenIcon,
  FaceSmileIcon,
  PhotoIcon,
  TagIcon,
  Squares2X2Icon,
  FireIcon,
} from '@heroicons/react/24/solid'

const AddEvent = () => {
  const HeroIconsMap = {
    UserGroupIcon,
    Cog6ToothIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ComputerDesktopIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    MicrophoneIcon,
    CpuChipIcon,
    BriefcaseIcon,
    HeartIcon,
    BookOpenIcon,
    FaceSmileIcon,
    PhotoIcon,
    GlobeAltIcon,
    PlayIcon,
    ShieldCheckIcon,
    RocketLaunchIcon,
    ChartPieIcon,
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [category, setCategory] = useState('General')
  const [activeCategory, setActiveCategory] = useState(1)

  // Track tags for each category separately
  const [selectedTags, setSelectedTags] = useState({
    General: [],
    Professional: [],
    Popular: [],
  })

  const generalIcons = EventLists.eventArray.find(
    (e) => e.category === 'General'
  )
  const [icons, setIcons] = useState(generalIcons?.tags || [])

  // Log selected tags whenever they change
  useEffect(() => {
    console.log(`Selected ${category} tags:`, selectedTags[category])
  }, [selectedTags, category])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagClick = (type) => {
    setSelectedTags((prev) => {
      const currentCategoryTags = prev[category]
      const updatedCategoryTags = currentCategoryTags.includes(type)
        ? currentCategoryTags.filter((tag) => tag !== type)
        : [...currentCategoryTags, type]

      return {
        ...prev,
        [category]: updatedCategoryTags,
      }
    })
  }

  const handleCategoryChange = (newCategory) => {
    const categoryMap = {
      General: 1,
      Professional: 2,
      Popular: 3,
    }

    setActiveCategory(categoryMap[newCategory])
    setCategory(newCategory)

    const relevantIcons = EventLists.eventArray.find(
      (e) => e.category === newCategory
    )
    setIcons(relevantIcons?.tags || [])
  }

  return (
    <div className="w-full flex justify-center">
      <div className="h-auto mb-2 border-neutral-500/50 w-[80%] bg-neutral-800/20 rounded border text-white p-4 mt-10">
        <div className="flex flex-col items-center">
          <div className="font-semibold text-lg mb-8">
            Enter the Event details below
          </div>

          <div className="mb-8 w-full">
            <div className="text-sm text-slate-400 mb-2">
              What's the event about?
            </div>
            <Input
              placeholder="Title"
              id="title"
              name="title"
              onChange={handleChange}
              type="text"
              value={formData.title}
              className="mb-4"
            />
            <Input
              placeholder="Description"
              id="description"
              name="description"
              onChange={handleChange}
              type="text"
              value={formData.description}
            />
          </div>

          <div className="w-full mb-8">
            <div className="text-sm text-slate-400 mb-4">Choose a Category</div>
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-3 md:gap-6">
              <CategoryBtn
                type="General"
                handleClick={() => handleCategoryChange('General')}
                isActeeve={activeCategory === 1}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </CategoryBtn>
              <CategoryBtn
                type="Professional"
                handleClick={() => handleCategoryChange('Professional')}
                isActeeve={activeCategory === 2}
              >
                <BriefcaseIcon className="h-5 w-5" />
              </CategoryBtn>
              <CategoryBtn
                type="Popular"
                handleClick={() => handleCategoryChange('Popular')}
                isActeeve={activeCategory === 3}
              >
                <FireIcon className="h-5 w-5" />
              </CategoryBtn>
            </div>
          </div>

          <div className="w-full">
            <div className="text-sm text-slate-400 flex flex-row gap-2 mb-4">
              Select Relevant Tags
              <TagIcon className="h-5 w-5" />
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-3 md:gap-6">
              {icons.map((icon) => {
                const IconComponent = HeroIconsMap[icon.heroicons]
                return (
                  <ClickableButton
                    key={icon.tag}
                    type={icon.tag}
                    handleClick={() => handleTagClick(icon.tag)}
                    isSelected={selectedTags[category].includes(icon.tag)}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                  </ClickableButton>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
