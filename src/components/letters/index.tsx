import React from 'react'
import { seions } from '@/services/data'
import Letter from '@/components/letter'
import { chunk } from 'lodash'
import { css } from '@emotion/core'
import { Flex, Box } from '@rebass/grid/emotion'

export default function Letters() {
  return (
    <div
      css={css`
        padding: 4px;
      `}
    >
      {chunk(seions, 5).map((group, i) => (
        <Flex key={i} alignItems="stretch">
          {group.map((item, j) => (
            <Box key={j} width={1 / 5} p={1}>
              <Letter key={i} {...item} />
            </Box>
          ))}
        </Flex>
      ))}
    </div>
  )
}
