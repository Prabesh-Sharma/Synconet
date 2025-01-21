import { useEffect, useState } from 'react'
import {
  BookOpenIcon,
  CameraIcon,
  MusicalNoteIcon,
  BeakerIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline'
import {
  CheckCircle,
  Clapperboard,
  CookingPot,
  Dumbbell,
  Gamepad2,
  Palette,
  Pi,
  PlaneTakeoff,
  Telescope,
  Trees,
  Trophy,
} from 'lucide-react'

import ClickableButton from '../../components/ClickableButton'
import axios from '../../../../../axiosConfig'

const Interest = ({ handleInterestUpdates }) => {
  const [interests, setInterests] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    console.log(interests)
  }, [interests])

  const sendInterest = async () => {
    if (!token) {
      console.log('token not found')
      return
    }
    if (interests.length === 0) {
      console.log("blank interests can't be sent")
      return
    }

    try {
      const response = await axios.post(
        '/api/interest/set',
        { interests },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (err) {
      console.log('an error has occured', err.response?.data || err.message)
    }
    handleInterestUpdates()
  }

  const handleClick = (type) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(type)) {
        return prevInterests.filter((interest) => interest !== type)
      } else {
        return [...prevInterests, type]
      }
    })
  }
  return (
    <>
      <div className="p-4 flex flex-col items-center border border-neutral-500/50 bg-neutral-800/20 rounded">
        <div className="text-xl text-neutral-200 italic">
          Choose Your Interests
        </div>
        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-3 md:gap-6 mt-4">
          <ClickableButton type="Music" handleClick={handleClick}>
            <MusicalNoteIcon className="h-5 w-5" />
          </ClickableButton>
          <ClickableButton type="Science" handleClick={handleClick}>
            <BeakerIcon className="h-5 w-5" />
          </ClickableButton>
          <ClickableButton type="Reading" handleClick={handleClick}>
            <BookOpenIcon className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Photography" handleClick={handleClick}>
            <CameraIcon className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Sports" handleClick={handleClick}>
            <Trophy className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Space" handleClick={handleClick}>
            <Telescope className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Travelling" handleClick={handleClick}>
            <PlaneTakeoff className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Programming" handleClick={handleClick}>
            <CodeBracketIcon className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Art" handleClick={handleClick}>
            <Palette className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Mathematics" handleClick={handleClick}>
            <Pi className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Writing" handleClick={handleClick}>
            <PencilSquareIcon className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Fitness" handleClick={handleClick}>
            <Dumbbell className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Technology" handleClick={handleClick}>
            <CpuChipIcon className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Movies" handleClick={handleClick}>
            <Clapperboard className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Gaming" handleClick={handleClick}>
            <Gamepad2 className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Cooking" handleClick={handleClick}>
            <CookingPot className="h-5 w-5 text-inherit" />
          </ClickableButton>
          <ClickableButton type="Nature" handleClick={handleClick}>
            <Trees className="h-5 w-5 text-inherit" />
          </ClickableButton>
        </div>
        <button
          className="bg-slate-50 px-2 py-1 rounded-md text-blue-950 
                                    hover:bg-blue-800 hover:text-slate-50 hover:rounded-3xl hover:border-slate-50 
                                    transition-all border-blue-800 border-2 flex flex-row gap-1 mt-8"
          onClick={sendInterest}
        >
          Confirm
          <CheckCircle className="stroke-[1.75] min-w-6 w-6" />
        </button>
      </div>
    </>
  )
}

export default Interest
