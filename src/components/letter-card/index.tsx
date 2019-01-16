import React, { useRef, useEffect, useState } from 'react'
import { Letter } from '@/services/letter'
import { css } from '@emotion/core'
import { Flex } from '@rebass/grid/emotion'
import { useSpring, animated } from 'react-spring/hooks'
import styled from '@/styled'
import ProgressiveImage from 'react-progressive-image'
import LetterDrawing from '@/components/letter-drawing'

export default function LetterCard(props: Letter & { style?: any }) {
  const { hiragana, katakana, roomaji, chinese, figure, ...rest } = props

  if (hiragana === '') {
    return null
  }

  const [flipped, setFlip] = useState(false)
  const flipProps: any = useSpring({
    opacity: flipped ? 0 : 1,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
  })

  const [svgFile, setSvgFile] = useState('')
  useEffect(() => {
    import(`@/assets/hiragana/svgs/${roomaji}.svg`)
      .then(m => m.default)
      .then(svg => {
        setSvgFile(svg)
      })
      .catch(err => {
        setSvgFile('')
      })
  }, [])

  return (
    <CardContainer {...rest} onClick={() => setFlip(flip => !flip)}>
      <Card
        style={{
          opacity: flipProps.opacity.interpolate((o: number) => 1 - o),
          transform: flipProps.transform.interpolate(
            (t: string) => `${t} rotateY(180deg)`
          ),
        }}
      >
        <LetterDrawing letter={props} svg={svgFile} />
      </Card>

      <Card style={flipProps}>
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
    </CardContainer>
  )
}

const CardContainer = styled('div')`
  position: relative;
  height: 74%;
  min-height: 460px;
  width: 94%;
  backface-visibility: hidden;
`

const Card = styled(animated.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  background: #fff;
  border: 2px solid #41403e;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  box-shadow: 15px 28px 25px -18px rgba(0, 0, 0, 0.2);
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
