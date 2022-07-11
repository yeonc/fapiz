import { css } from '@emotion/react'
import GlobalStyles from '@mui/material/GlobalStyles'

const resetStyles = css`
  * {
    margin: 0;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
`

const globalResetStyles = <GlobalStyles styles={resetStyles} />

export default globalResetStyles
