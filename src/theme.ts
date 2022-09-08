import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { DEFAULT_BLACK } from 'styles/constants/color'

const DEFAULT_FONT_FAMILY = '"Noto Sans KR", sans-serif'

const theme = createTheme({
  typography: {
    fontFamily: DEFAULT_FONT_FAMILY,
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: DEFAULT_BLACK,
        underline: 'none',
      },
    },
  },
  palette: {
    primary: {
      main: '#0A0903',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
