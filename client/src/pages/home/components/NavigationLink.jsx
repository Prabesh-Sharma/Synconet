import { Link } from "react-router-dom";
import { useState } from "react";

const NavigationLink = ({ children, name, isOpen, to }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <Link
            to={to}
            className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 
            text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 
            transition-colors duration-100"
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
            <p
                className={`text-inherit tracking-wide transition-opacity duration-300 ${isOpen || isFocused ? "opacity-100" : "opacity-0"
                    }`}
                style={{ visibility: isOpen || isFocused ? "visible" : "hidden" }}
            >
                {name}
            </p>
        </Link>
    );
};

export default NavigationLink;