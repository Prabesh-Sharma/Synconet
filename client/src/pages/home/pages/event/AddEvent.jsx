import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Input from '../../../auth/form/components/Input'
import EventLists from './events.json'
import ClickableButton from '../../components/ClickableButton'
import CategoryBtn from '../../components/CategoryButton'
import { io } from "socket.io-client";
import { API_URL } from '../../../../../constants'

import {
  AcademicCapIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
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
  ClockIcon,
  CalendarIcon,
  PresentationChartBarIcon,
  UsersIcon,
  MegaphoneIcon,
  BanknotesIcon,
  PencilIcon,
  LightBulbIcon,
  ChartBarIcon,
  CloudIcon,
  CubeIcon,
} from '@heroicons/react/24/solid'

import axios from '../../../../../axiosConfig'
import { ArrowLeftFromLine, CpuIcon, ServerCog, Handshake } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AddEvent = () => {
  const [token, _] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  const HeroIconsMap = {
    // General category
    UserGroupIcon,
    Cog6ToothIcon,
    PresentationChartBarIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ComputerDesktopIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    MicrophoneIcon,
    Handshake,

    // Professional category
    ServerCog,
    BriefcaseIcon,
    MegaphoneIcon,
    BanknotesIcon,
    PencilIcon,
    LightBulbIcon,
    ChartBarIcon,

    // Social category
    UsersIcon,
    HeartIcon,
    BookOpenIcon,
    FaceSmileIcon,
    PhotoIcon,
    GlobeAltIcon,
    PlayIcon,

    // Popular category
    CpuIcon,
    CubeIcon,
    ShieldCheckIcon,
    RocketLaunchIcon,
    CloudIcon,
    ChartPieIcon,
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [category, setCategory] = useState('General')
  const [activeCategory, setActiveCategory] = useState(1)
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())

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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  useEffect(() => {
    console.log('Start Date/Time:', startDateTime)
    console.log('End Date/Time:', endDateTime)
  }, [startDateTime, endDateTime])

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

  const socket = io(API_URL); 
  const handleSubmit = async () => {
    const finalData = {
      ...formData,
      category,
      tags: selectedTags[category],
      startDateTime,
      endDateTime,
    }

    console.log('Final Data:', finalData)

    try {
      const response = await axios.post('/api/events/set', finalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Event created successfully:', response.data)
      socket.emit('new-event', { 
        message: `A new event '${formData.title}' has been added!`,
        timestamp: new Date().toISOString() 
      });
      
      navigate('/home/events')
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  return (
    <>
      <style>
        {`
          .react-datepicker {
            background-color: #1f2937;
            border-color: #374151;
            font-family: inherit;
          }

          .react-datepicker__header {
            background-color: #111827;
            border-bottom-color: #374151;
          }

          .react-datepicker__current-month,
          .react-datepicker__day-name,
          .react-datepicker-time__header {
            color: #fff;
          }

          .react-datepicker__day {
            color: #fff;
          }

          .react-datepicker__day:hover {
            background-color: #374151;
          }

          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected {
            background-color: #3b82f6;
            color: #fff;
          }

          .react-datepicker__day--disabled {
            color: #6b7280;
          }

          .react-datepicker__time-container {
            border-left-color: #374151;
          }

          .react-datepicker__time-container .react-datepicker__time {
            background-color: #1f2937;
          }

          .react-datepicker__time-container .react-datepicker__time-box {
            background-color: #1f2937;
          }

          .react-datepicker__time-container .react-datepicker__time-list-item {
            color: #fff;
          }

          .react-datepicker__time-container .react-datepicker__time-list-item:hover {
            background-color: #374151;
          }

          .react-datepicker__time-container .react-datepicker__time-list-item--selected {
            background-color: #3b82f6 !important;
          }

          .react-datepicker__navigation-icon::before {
            border-color: #fff;
          }

          .react-datepicker__year-read-view--down-arrow,
          .react-datepicker__month-read-view--down-arrow {
            border-color: #fff;
          }

          .react-datepicker__month-option,
          .react-datepicker__year-option {
            background-color: #1f2937;
            color: #fff;
          }

          .react-datepicker__month-option:hover,
          .react-datepicker__year-option:hover {
            background-color: #374151;
          }

          .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before,
          .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::after {
            border-bottom-color: #111827;
          }

          .react-datepicker__day:hover {
          background-color: #64748b !important;
          color: white !important;
          }

        .react-datepicker__time-container .react-datepicker__time-list-item:hover {
        background-color: #64748b !important; /* Slate-500 */
        color: white !important;
        }
        `}
      </style>

      <div className="relative" onClick={() => navigate('/home/events')}>
        <ArrowLeftFromLine className="size-8 text-white cursor-pointer absolute left-20 top-14" />
      </div>
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
              <div className="text-sm text-slate-400 mb-4">
                Choose a Category
              </div>
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

              <div className="mt-8">
                <div className="text-sm text-slate-400 flex flex-row gap-2 mb-4">
                  Select Time and Date
                  <ClockIcon className="h-5 w-5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex flex-row text-sm text-slate-400">
                      Start Date & Time
                      <CalendarIcon className="size-5 ml-2" />
                    </label>
                    <DatePicker
                      selected={startDateTime}
                      onChange={(date) => setStartDateTime(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full px-3 py-2 bg-neutral-700 rounded text-white"
                      calendarClassName="bg-neutral-800 text-white"
                      minDate={new Date()}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex flex-row text-sm text-slate-400">
                      End Date & Time
                      <CalendarIcon className="size-5 ml-2" />
                    </label>
                    <DatePicker
                      selected={endDateTime}
                      onChange={(date) => setEndDateTime(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full px-3 py-2 bg-neutral-700 rounded text-white"
                      calendarClassName="bg-neutral-800 text-white"
                      minDate={startDateTime}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="bg-white text-black rounded-md px-4 py-2 border-blue-800 border-2 mt-8 hover:bg-blue-400 hover:rounded-xl transition-all duration-200"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEvent
