import { css } from '@emotion/react'

export const horizontal = css`
  display: flex;
  align-items: center;
`

export const setMarginRight = (marginValue: number) => css`
  margin-right: ${marginValue}px;
`

export const setMarginBottom = (marginValue: number) => css`
  margin-bottom: ${marginValue}px;
`
