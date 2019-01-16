import React from 'react'
import { css } from '@emotion/core'
import LoadingImage from '@/assets/images/loading.svg'
import EmptyImage from '@/assets/images/empty.svg'
import ErrorImage from '@/assets/images/error.svg'
import TodoImage from '@/assets/images/todo.svg'

interface StatusProps {
  status: 'loading' | 'empty' | 'error' | 'todo'
}

type StatusImageMap = { [key in StatusProps['status']]: string }

export default function Status(props: StatusProps) {
  const { status } = props

  const imageMap: StatusImageMap = {
    empty: EmptyImage,
    error: ErrorImage,
    loading: LoadingImage,
    todo: TodoImage,
  }

  return (
    <img
      src={imageMap[status]}
      alt={status}
      css={css`
        max-width: 100%;
      `}
    />
  )
}
