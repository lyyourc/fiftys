import React from 'react'
import LetterItem from './item'
import { chunk, noop } from 'lodash'
import { css } from '@emotion/core'
import { Flex, Box } from '@rebass/grid/emotion'
import { Letter } from '@/services/letter'

export interface LettersProps {
  letters: Letter[]
  onLetterClick?: (letter: Letter, index: number) => any
}

export default function Letters(props: LettersProps) {
  const { letters, onLetterClick = noop } = props
  const cols = 5

  return (
    <div>
      {chunk(letters, cols).map((group, i) => (
        <Flex key={i} alignItems="stretch">
          {group.map((item, j) => (
            <Box
              key={j}
              width={1 / 5}
              p={1}
              onClick={() => onLetterClick(item, i * cols + j)}
            >
              <LetterItem key={i} {...item} />
            </Box>
          ))}
        </Flex>
      ))}
    </div>
  )
}
