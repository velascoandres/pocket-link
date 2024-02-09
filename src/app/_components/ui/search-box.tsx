'use client'

import React, { useState } from 'react'

import { IconSearch } from '@tabler/icons-react'

import { useDebounceCallback } from '@/app/_hooks'

import { Input } from './input'

interface Props {
	value?: string
  placeholder?: string
	onSearch: (search: string) => void
}


export const SearchBox = ({ value, onSearch, placeholder = 'Search something' }: Props) => {

  const debounce = useDebounceCallback()

  const [inputValue, setInputValue] = useState(value)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evt

    setInputValue(value)

    debounce(() => onSearch(value))
  }

  return (
    <div className="relative py-2 w-full md:w-1/2 z-0">
      <IconSearch className="absolute z-10 left-2 top-4" />
      <Input
        value={inputValue}
        placeholder={placeholder}
        className="w-full pl-10"
        onChange={handleChange}
      />
    </div>
  )
}
