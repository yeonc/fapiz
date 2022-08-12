import { css } from '@emotion/react'
import GlobalStyles from '@mui/material/GlobalStyles'

const fullHeightStyles = css`
  html,
  body,
  body > div#__next,
  div#__next > div {
    height: 100%;
  }
`

const globalFullHeightStyles = <GlobalStyles styles={fullHeightStyles} />

export default globalFullHeightStyles
