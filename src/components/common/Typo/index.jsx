import Typography from '@mui/material/Typography'

export default function Typo({ ...restProps }) {
  return <Typography variant="h4" component="h1" gutterBottom {...restProps} />
}
