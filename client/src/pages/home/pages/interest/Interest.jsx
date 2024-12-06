import { useEffect, useState } from "react";
import {
    BookOpenIcon,
    CameraIcon,
    CubeTransparentIcon,
    MusicalNoteIcon,
    SparklesIcon,
    ComputerDesktopIcon,
    MapIcon,
    BeakerIcon,
    CodeBracketIcon,
    PaintBrushIcon
} from "@heroicons/react/24/outline";
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
                    <InterestButton type="Technology" handleClick={handleClick}>
                        <ComputerDesktopIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Sports" handleClick={handleClick}>
                        <CubeTransparentIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Space" handleClick={handleClick}>
                        <SparklesIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Travelling" handleClick={handleClick}>
                        <MapIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Programming" handleClick={handleClick}>
                        <CodeBracketIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                    <InterestButton type="Art" handleClick={handleClick}>
                        <PaintBrushIcon className="h-5 w-5 text-inherit" />
                    </InterestButton>
                </div>
            </div>
        </>
    )
}

export default Interest