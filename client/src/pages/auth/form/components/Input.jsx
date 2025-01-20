import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const Input = ({ placeholder, id, name, onChange, type, value }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const togglePasswordVisibility = (event) => {
    event.preventDefault()
    setPasswordVisible((prev) => !prev)
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type

  return (
    <div className="relative mt-6">
      <input
        type={inputType}
        value={value}
        autoComplete="off"
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={id}
        className="peer h-10 w-72 bg-transparent border-b-2 border-gray-300 text-white 
                   placeholder-transparent focus:outline-none focus:border-blue-600 p-1 pr-10"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                  peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-200 
                  peer-focus:text-sm"
      >
        {placeholder}
      </label>
      {type === 'password' && isFocused && (
        <button
          type="button"
          onMouseDown={(event) => togglePasswordVisibility(event)}
          className="absolute right-0 top-2 text-gray-400 hover:text-gray-200"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  )
}

export default Input
