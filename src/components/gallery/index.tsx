import React, { useState, useRef, useEffect } from 'react'
import { useGesture } from 'react-with-gesture'
import { clamp, noop } from 'lodash'
import { Letter } from '@/services/letter'
import styled from '@/styled'
import LetterCard from '../letter-card'

export default function Gallery({
  visible = true,
  defaultIndex = 0,
  items = [],
  onClose,
}: {
  visible: boolean
  defaultIndex?: number
  items: Letter[]
  onClose: () => any
}) {
  const indexRef = useRef(defaultIndex)
  const [index, setIndex] = useState<number>(indexRef.current)

  useEffect(
    () => {
      indexRef.current = defaultIndex
      setIndex(indexRef.current)
    },
    [defaultIndex]
  )

  const bind = useGesture(event => {
    const {
      down,
      delta: [xDelta],
      direction: [xDir],
      distance,
      cancel,
    } = event

    if (down && distance > window.innerWidth / 3) {
      const nextIndex = (indexRef.current = clamp(
        indexRef.current + (xDir > 0 ? -1 : 1),
        0,
        items.length - 1
      ))
      setIndex(nextIndex)
      cancel && cancel()
    }
  })

  function handleOverlayClick() {
    onClose()
  }

  if (visible === false) {
    return null
  }

  return (
    <Container {...bind()}>
      <Overlay onClick={handleOverlayClick} />
      <Content>
        <LetterCard {...items[index]} />
      </Content>
    </Container>
  )
}

const Container = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
`

const Content = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 94%;
  height: 460px;
  transform: translate(-50%, -50%);
`

const Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`
