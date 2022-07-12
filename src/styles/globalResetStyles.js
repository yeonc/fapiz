import GlobalStyles from '@mui/material/GlobalStyles'

const globalResetStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
      },
      ul: {
        listStyle: 'none',
        paddingLeft: 0,
      },
    }}
  />
)

export default globalResetStyles
