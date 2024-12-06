import { useEffect, useState } from "react";
import {
    BookOpenIcon,
    CameraIcon,
    MusicalNoteIcon,
    BeakerIcon,
    CodeBracketIcon,
    PencilSquareIcon,
    CpuChipIcon
} from "@heroicons/react/24/outline";
import {
    Clapperboard,
    CookingPot,
    Dumbbell,
    Gamepad2,
    Palette,
    Pi,
    PlaneTakeoff,
    Telescope,
    Trees,
    Trophy
} from 'lucide-react'

import InterestButton from "../../components/InterestButton";

const Interest = () => {
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        console.log(interests);
    }, [interests]);

    const handleClick = (type) => {
        setInterests((prevInterests) => {
            if (prevInterests.includes(type)) {
                return prevInterests.filter((interest) => interest !== type);
            } else {
                return [...prevInterests, type];
            }
        });
    };
    return (
        <>
            <div className="p-4">
                <div className="text-xl text-neutral-200 italic">Choose Your Interests</div>
                <div className="flex flex-row flex-wrap gap-8 mt-4">
                    <InterestButton type="Music" handleClick={handleClick}>
                        <MusicalNoteIcon className="h-5 w-5" />
                    </InterestButton>
                    <InterestButton type="Science" handleClick={handleClick}>
                        <BeakerIcon className="h-5 w-5" />
                    </InterestButton>
                    <InterestButton type="Reading" handleClick={handleClick}>
                        <BookOpenIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Photography" handleClick={handleClick}>
                        <CameraIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Sports" handleClick={handleClick}>
                        <Trophy className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Space" handleClick={handleClick}>
                        <Telescope className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Travelling" handleClick={handleClick}>
                        <PlaneTakeoff className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Programming" handleClick={handleClick}>
                        <CodeBracketIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Art" handleClick={handleClick}>
                        <Palette className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Mathematics" handleClick={handleClick}>
                        <Pi className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Writing" handleClick={handleClick}>
                        <PencilSquareIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Fitness" handleClick={handleClick}>
                        <Dumbbell className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Technology" handleClick={handleClick}>
                        <CpuChipIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Movies" handleClick={handleClick}>
                        <Clapperboard className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Gaming" handleClick={handleClick}>
                        <Gamepad2 className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Cooking" handleClick={handleClick}>
                        <CookingPot className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Nature" handleClick={handleClick}>
                        <Trees className="h-5 w-5 text-inherit" />
                    </InterestButton>
                </div>
            </div>
        </>
    )
}

export default Interest