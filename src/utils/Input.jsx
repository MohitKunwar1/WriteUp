import React from 'react'

const Input = ({type, title, form, setForm}) => {
  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }
  return (
    <div className='flex flex-col gap-2 '>
    <label className='text-lg font-medium capitalize mt-[2rem]'>
        {title}
    </label>
    <input onChange={handleChange} type={type} name={title} className='text-center border-b border-black outline-none mx-20' />
    </div>
  )
}

export default Input