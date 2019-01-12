import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import fuzzysort from 'fuzzysort'
import { Flex, Box } from '@rebass/grid/emotion'
import { css } from '@emotion/core'
import { seions } from '@/services/data'
import { Letter } from '@/services/letter'
import Letters from '@/components/letters'
import Search from '@/components/search'
import Status from '@/components/status'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const lettersFiltered = filterLetters(seions, search)

  return (
    <Flex
      flexDirection="column"
      css={css`
        min-height: 100vh;
      `}
    >
      <Box m={2} mt={3}>
        <Search placeholder="あ；ア；a ；安" onChange={handleSearchChange} />
      </Box>

      {!isEmpty(lettersFiltered) ? (
        <Letters letters={lettersFiltered} />
      ) : (
        <Flex flex={1} alignItems="center" m={2}>
          <Status status="empty" />
        </Flex>
      )}
    </Flex>
  )

  function handleSearchChange(input: string) {
    setSearch(input)
  }

  function filterLetters(letters: Letter[], search: string) {
    if (search === '') return letters

    const results = fuzzysort
      .go(search, letters, {
        keys: ['hiragana', 'katakana', 'roomaji', 'chinese'],
        allowTypo: true,
        limit: 50,
      })
      .map(result => result.obj)

    return results
  }
}
