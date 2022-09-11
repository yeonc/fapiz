import { createTheme } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

const DEFAULT_FONT_FAMILY = '"Noto Sans KR", sans-serif'

const theme = createTheme({
  typography: {
    fontFamily: DEFAULT_FONT_FAMILY,
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: grey[900],
        underline: 'none',
      },
    },
  },
  palette: {
    primary: {
      main: grey[900],
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
