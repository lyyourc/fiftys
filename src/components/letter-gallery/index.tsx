import React, { useRef } from 'react'
import { clamp, noop } from 'lodash'
import * as springHooks from 'react-spring/hooks'
import { useGesture, GestureOptions, GestureState } from 'react-with-gesture'
import { css } from '@emotion/core'
import { Letter } from '@/services/letter'
import LetterCard from '@/components/letter-card'

interface LetterGalleryProps {
  index: number
  letters: Letter[]
  onClose?: React.MouseEventHandler
}

export default function LetterGallery(props: LetterGalleryProps) {
  const { letters, index: defaultIndex, onClose = noop } = props

  const index = useRef(defaultIndex)

  const [springProps, springSet] = (springHooks as any).useSprings(
    letters.length,
    (i: number) => ({
      x: (i - index.current) * window.innerWidth,
      sc: 1,
      display: 'block',
    })
  )

  const bind: any = useGesture({
    onAction: (gesture: any) => {
      const {
        down,
        delta: [xDelta],
        direction: [xDir],
        distance,
        cancel,
      } = gesture

      if (down && distance > window.innerWidth / 2) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          letters.length - 1
        )
        cancel()
      }

      springSet((i: number) => {
        if (i < index.current - 1 && i > index.current + 1) {
          return { display: 'none' }
        }

        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1
        return { x, sc, display: 'block' }
      })
    },
  })

  const { animated } = springHooks
  return (
    <div
      css={css`
        position: fixed;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.5);
      `}
      onClick={onClose}
    >
      {springProps.map(({ x, display, sc }: any, i: number) => (
        <animated.div
          {...bind()}
          key={i}
          css={css`
            position: absolute;
            width: 100vw;
            height: 100vh;
            will-change: transform;
          `}
          style={{
            display,
            transform: x.interpolate((x: number) => `translate3d(${x}px,0,0)`),
          }}
        >
          <animated.div
            css={css`
              width: 100%;
              height: 100%;
              will-change: transform;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            style={{
              transform: sc.interpolate((s: number) => `scale(${s})`),
            }}
          >
            <LetterCard {...letters[i]} />
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}
