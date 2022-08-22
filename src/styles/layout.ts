import { css } from '@emotion/react'

export const horizontal = css`
  display: flex;
  align-items: center;
`

export const mgRight = (marginValue: number) => css`
  margin-right: ${marginValue}px;
`

export const mgBottom = (marginValue: number) => css`
  margin-bottom: ${marginValue}px;
`
