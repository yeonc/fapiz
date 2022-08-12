import { FormEvent, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { setMarginRight } from 'styles/layout'

type SearchFormProps = {
  onSearchKeywordSubmit: (keyword: string) => void
}

const SearchForm = ({ onSearchKeywordSubmit }: SearchFormProps) => {
  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchKeywordSubmit(keyword)
  }

  return (
    <form onSubmit={handleSearchFormSubmit}>
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        type="search"
        inputProps={{ required: true, minLength: 2 }}
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={e => handleKeywordChange(e.target.value)}
        css={setMarginRight(8)}
      />
      <Button type="submit" variant="contained" size="large">
        검색
      </Button>
    </form>
  )
}

export default SearchForm
