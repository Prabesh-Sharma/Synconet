import { Link } from 'react-router-dom'

const NavigationLink = ({ children, name, isOpen, to }) => {
  return (
    <Link
      to={to}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 
            text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 
            transition-colors duration-100 focus:stroke-neutral-100 focus:text-neutral-100 focus:bg-neutral-700/30"
    >
      {children}
      <p
        className={`text-inherit tracking-wide transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        {name}
      </p>
    </Link>
  )
}

export default NavigationLink
