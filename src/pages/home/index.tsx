import React, { useState, useRef, useEffect } from 'react'
import { isEmpty } from 'lodash'
import fuzzysort from 'fuzzysort'
import { Flex, Box } from '@rebass/grid/emotion'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Transition } from 'react-spring'
import { useTransition, animated, config, useSpring } from 'react-spring/hooks'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { seions } from '@/services/data'
import { Letter, createNoopLetter } from '@/services/letter'
import Letters from '@/components/letters'
import Search from '@/components/search'
import Status from '@/components/status'
import theme from '@/styled/theme'
import LetterCard from '@/components/letter-card'
import Gallery from '@/components/gallery'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const lettersFiltered = filterLetters(seions, search)

  const [activeLetterIndex, setActiveLetterIndex] = useState(-1)

  const scrollEl = useRef(null)
  useEffect(() => {
    handleBodyScroll(scrollEl.current)
  }, [])

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <Box px={2} pt={3}>
        <Search placeholder="あ；ア；a ；安" onChange={handleSearchChange} />
      </Box>
      <Gallery
        visible={activeLetterIndex !== -1}
        items={lettersFiltered}
        defaultIndex={activeLetterIndex}
        onClose={() => setActiveLetterIndex(-1)}
      />
      <div
        ref={scrollEl}
        css={css`
          height: calc(100% - ${theme.heights.search} - 16px);
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          padding: 8px;
          display: flex;
          flex-direction: column;
        `}
      >
        {!isEmpty(lettersFiltered) ? (
          <Letters
            letters={lettersFiltered}
            onLetterClick={handleLetterClick}
          />
        ) : (
          <Flex flex={1} alignItems="center">
            <Status status="empty" />
          </Flex>
        )}
      </div>
    </div>
  )

  function handleLetterClick(letter: Letter, index: number) {
    setActiveLetterIndex(index)
  }

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

  function handleBodyScroll(scrollEl: HTMLElement | null) {
    if (scrollEl) {
      disableBodyScroll(scrollEl)
    }

    return () => {
      enableBodyScroll(scrollEl)
    }
  }
}
