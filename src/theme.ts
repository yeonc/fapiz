import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { DEFAULT_BLACK } from 'styles/constants/color'

// Create a theme instance.
const theme = createTheme({
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
