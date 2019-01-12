import React from 'react'
import { Letter } from '@/services/letter'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Flex } from '@rebass/grid/emotion'

export default function LetterItem(props: Letter) {
  const { hiragana, katakana, roomaji, chinese } = props

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={css`
        border: 2px solid #41403e;
        border-bottom-left-radius: 15px 255px;
        border-bottom-right-radius: 225px 15px;
        border-top-left-radius: 255px 15px;
        border-top-right-radius: 15px 225px;
        height: 100%;
      `}
    >
      {props.hiragana === '' ? (
        <div
          css={css`
            font-size: 26px;
            transform: scale(0.6);
          `}
        >
          🍄
        </div>
      ) : (
        <Flex flexDirection="column" alignItems="center" p={1}>
          <SmallText>{roomaji}</SmallText>
          <div>
            <span
              css={css`
                margin-right: 4px;
                font-weight: bold;
              `}
            >
              {hiragana}
            </span>
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {katakana}
            </span>
          </div>
          <SmallText>{chinese}</SmallText>
        </Flex>
      )}
    </Flex>
  )
}

const SmallText = styled('div')`
  font-size: 0.8em;
`
