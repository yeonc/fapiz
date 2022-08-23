import { css } from '@emotion/react'
import GlobalStyles from '@mui/material/GlobalStyles'
import { DEFAULT_BLACK } from './constants/color'

const resetStyles = css`
  * {
    margin: 0;
  }

  body {
    color: ${DEFAULT_BLACK};
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
`

const globalResetStyles = <GlobalStyles styles={resetStyles} />

export default globalResetStyles
