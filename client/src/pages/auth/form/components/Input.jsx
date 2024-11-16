const Input = ({ placeholder, id, name, onChange, type }) => {

    return (
        <div className="relative mt-10">
            <input type={type} autoComplete="off" onChange={onChange} placeholder={placeholder} name={name} id={id}
                className="peer h-10 w-72 bg-transparent border-b-2 border-gray-300 text-white 
                placeholder-transparent focus:outline-none focus:border-blue-600 p-1"
            />
            <label htmlFor={id}
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                  peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-200 
                  peer-focus:text-sm" >{placeholder}</label>
        </div >
    )
}

export default Input