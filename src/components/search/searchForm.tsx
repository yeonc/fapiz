import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'

const SearchForm = () => (
  <form>
    <OutlinedInput
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      type="search"
      inputProps={{ required: true, minLength: 2 }}
      placeholder="검색어를 입력하세요"
    />
    <Button type="submit" variant="contained" size="large">
      검색
    </Button>
  </form>
)

export default SearchForm
