import React from 'react'
import { Letter } from '@/services/letter'
import { css } from '@emotion/core'
import styled from '@/styled'

export default function LetterCard(props: Letter) {
  const { hiragana, katakana } = props

  return (
    <Card
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <h2>{hiragana}</h2>
    </Card>
  )
}

export const Card = styled('div')`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 100%;
  border: 2px solid #e6e7e9;
  background: #fff;
  box-shadow: 15px 28px 25px -18px rgba(0, 0, 0, 0.2);
  transition: all 235ms ease 0s;
  will-change: transform;
  backface-visibility: hidden;
`
