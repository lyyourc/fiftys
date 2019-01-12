import React from 'react'
import LetterItem from '@/components/letter'
import { chunk } from 'lodash'
import { css } from '@emotion/core'
import { Flex, Box } from '@rebass/grid/emotion'
import { Letter } from '@/services/letter'

export interface LettersProps {
  letters: Letter[]
}

export default function Letters(props: LettersProps) {
  const { letters } = props

  return (
    <div>
      {chunk(letters, 5).map((group, i) => (
        <Flex key={i} alignItems="stretch">
          {group.map((item, j) => (
            <Box key={j} width={1 / 5} p={1}>
              <LetterItem key={i} {...item} />
            </Box>
          ))}
        </Flex>
      ))}
    </div>
  )
}
