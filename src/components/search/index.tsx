import React from 'react'
import styled from '@/styled'
import { noop } from 'lodash'
import { Box } from '@rebass/grid/emotion'
import { css } from '@emotion/core'
import theme from '@/styled/theme'

export interface ISearchProps {
  placeholder?: string
  onChange?: (value: string) => any
}

export default function Search(props: ISearchProps) {
  const { placeholder = '🔍 search', onChange = noop } = props

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    onChange(event.target.value)
  }

  return (
    <Box
      px={2}
      py={3}
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: ${theme.heights.search};
        z-index: 1;
        background: #fff;
      `}
    >
      <Input type="text" placeholder={placeholder} onChange={handleChange} />
    </Box>
  )
}

const Input = styled('input')`
  width: 100%;
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
  box-shadow: 4px 10px 10px -8px rgba(0, 0, 0, 0.2);
`
