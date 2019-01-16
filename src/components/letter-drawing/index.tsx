import React, { useRef, useEffect } from 'react'
import Vivus from 'vivus'
import { css } from '@emotion/core'
import { Letter } from '@/services/letter'
import { Theme } from '@/styled/theme'

interface IWritingProps {
  svg: React.ReactNode
  letter: Letter
}

export default function LetterDrawing(props: IWritingProps) {
  const { svg, letter } = props
  const containerRef = useRef(null)

  if (!svg) {
    return null
  }

  useEffect(() => {
    let timeId: number

    const animation = new Vivus(
      containerRef.current,
      {
        type: 'oneByOne',
        // start: 'manual',
        duration: 160,
        file: svg,
      },
      (myVivus: any) => {
        if (myVivus.getStatus() === 'end') {
          timeId = window.setTimeout(() => {
            myVivus.reset().play()
          }, 1000)
        }
      }
    )

    // animation.play()

    return () => {
      clearTimeout(timeId)
    }
  })

  return (
    <div
      ref={containerRef}
      css={theme => css`
        height: 100%;
        & svg {
          ${Svg(theme)}
        }
      `}
    />
  )
}

const Svg = (theme: Theme) => css`
  fill: none;
  stroke: ${theme.colors.accent};
  stroke-width: 16px;
  stroke-linecap: round;
  stroke-linejoin: round;

  & g {
    stroke: ${theme.colors.accent};
  }
`
