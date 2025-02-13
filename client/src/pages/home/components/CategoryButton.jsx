import { useState } from 'react'

const CategoryBtn = ({ children, type, handleClick, isActeeve }) => {
  const toggleFocus = () => {
    handleClick(type)
  }

  return (
    <>
      <button
        className={`flex flex-row rounded-md py-1 px-2 gap-1 border-2 
                    ${
                      isActeeve
                        ? 'bg-blue-600/20 border-blue-800'
                        : 'bg-neutral-500/20 border-neutral-400 hover:text-neutral-100 hover:border-neutral-100'
                    }
                    ${isActeeve ? 'text-blue-400' : 'text-neutral-400'}`}
        onClick={toggleFocus}
      >
        {children}
        <div className="text-inherit">{type}</div>
      </button>
    </>
  )
}

export default CategoryBtn
