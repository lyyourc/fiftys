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

export default function HomePage() {
  const [search, setSearch] = useState('')
  const lettersFiltered = filterLetters(seions, search)

  const [activeLetter, setActiveLetter] = useState(createNoopLetter())

  const scrollEl = useRef(null)
  useEffect(() => {
    handleBodyScroll(scrollEl.current)
  }, [])

  const isLetterActive = activeLetter.hiragana !== ''
  const modalTransitionProps = useSpring({
    opacity: isLetterActive ? 1 : 0,
    // transform: `scale(${isLetterActive ? 1 : 0})`,
    visibility: isLetterActive ? 'visible' : 'hidden',
  })
  const modalRef = useRef(null)

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <Box px={2} pt={3}>
        <Search placeholder="あ；ア；a ；安" onChange={handleSearchChange} />
      </Box>

      <div
        ref={scrollEl}
        css={css`
          height: calc(
            100% - ${theme.heights.search} - ${theme.heights.navbar} - 16px
          );
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

      <animated.div
        style={modalTransitionProps}
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          will-change: opacity transform;
        `}
      >
        <div
          css={css`
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
          ref={modalRef}
          onClick={event => {
            if (event.target === modalRef.current) {
              handleLetterClick(createNoopLetter())
            }
          }}
        >
          <LetterCard {...activeLetter} />
        </div>
      </animated.div>
    </div>
  )

  function handleLetterClick(letter: Letter) {
    setActiveLetter(letter)
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