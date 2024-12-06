import { useState } from 'react'

const InterestButton = ({ children, type, handleClick }) => {
    const [isActive, setIsActive] = useState(false)

    const toggleFocus = () => {
        handleClick(type)
        return setIsActive(!isActive)
    }

    return (
        <>
            <button
                className=
                {
                    `flex flex-row rounded-md py-1 px-2 gap-1 border-2 
                    ${isActive ? 'bg-blue-600/20 border-blue-800' : 'bg-neutral-400/20 border-slate-200'}
                    ${isActive ? 'text-blue-400' : 'text-white'}`
                }
                onClick={toggleFocus}>
                {children}
                <div className="text-inherit">{type}</div>
            </button>
        </>
    )
}

export default InterestButton
