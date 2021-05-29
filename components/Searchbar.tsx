import React, { ChangeEvent, useEffect, useState } from 'react'

import styled from 'styled-components'
import useDebounce from '../hooks/useDebounce'

const Searchbar = ({ handleSearch }: { handleSearch: any }) => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    useEffect(() => {
        handleSearch(value)
    }, [debouncedValue])
    return (
        <div>
            <Input type="text" value={value} onChange={handleChange} />
        </div>
    )
}

export default Searchbar

const Input = styled.input`
  border: 1px solid #2222224d;
  width: 240px;
  padding: 0.4em;
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px red;
  }
`