import React from 'react'
import { css } from '@emotion/core'
import Status from '@/components/status'
import { Theme } from '@/styled/theme'

export default function FqaPage() {
  return (
    <div
      css={(theme: Theme) => css`
        height: calc(100vh - ${theme.heights.navbar});
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Status status="todo" />
    </div>
  )
}
