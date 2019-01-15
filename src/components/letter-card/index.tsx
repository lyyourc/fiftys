import React from 'react'
import { Letter } from '@/services/letter'
import { css } from '@emotion/core'
import { Flex } from '@rebass/grid/emotion'
import styled from '@/styled'
import FigureImage from '@/assets/letters/ame.png'
import ProgressiveImage from 'react-progressive-image'

export default function LetterCard(props: Letter & { style?: any }) {
  const { hiragana, katakana, roomaji, chinese, figure, ...rest } = props

  return (
    <Card {...rest}>
      <div
        css={css`
          text-align: center;
        `}
      >
        <Hiragana>{hiragana}</Hiragana>
        <Roomaji>{roomaji}</Roomaji>
      </div>

      <Flex
        justifyContent="space-between"
        css={css`
          color: #aaa;
          padding: 0 20px;
        `}
      >
        <div>{katakana}</div>
        <div>{chinese}</div>
      </Flex>

      <Figure
        src={figure ? require(`@/assets/letters/${figure}.png`) : ''}
        width={280}
        height={280}
      />

      {/* <ProgressiveImage src={FigureImage} placeholder="">
        {(src: string, loading: boolean) => (
          <Figure
            src={src}
            width={250}
            height={250}
            // css={css`
            //   background-image: url(${FigureImage});
            //   filter: blur(${loading ? '10px' : '0'});
            //   transition: filter 400ms ease;
            // `}
          />
        )}
      </ProgressiveImage> */}
    </Card>
  )
}

const Card = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 74%;
  min-height: 460px;
  width: 94%;
  background: #fff;
  box-shadow: 15px 28px 25px -18px rgba(0, 0, 0, 0.2);
  backface-visibility: hidden;
  padding: 20px;
  border: 2px solid #41403e;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
`

const Hiragana = styled('span')`
  font-size: 60px;
  margin: 0;
  text-align: center;
`

const Roomaji = styled('span')`
  color: rgba(0, 0, 0, 0.8);
`

const Figure = styled('img')`
  margin: 0 auto;
`
