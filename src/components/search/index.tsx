import React from 'react'
import styled from '@emotion/styled'
import { noop } from 'lodash'

export interface ISearchProps {
  placeholder?: string
  onChange?: (value: string) => any
}

export default function Search(props: ISearchProps) {
  const { placeholder = '🔍 search', onChange = noop } = props

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    onChange(event.target.value)
  }

  return <Input type="text" placeholder={placeholder} onChange={handleChange} />
}

const Input = styled('input')`
  width: 100%;
  height: 42px;
  background: 0 0;
  border: 2px solid #41403e;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  color: #41403e;
  display: block;
  font-size: 1rem;
  outline: 0;
  padding: 0.5rem;
`
