import { FormEvent, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { mgRight } from 'styles/layout'

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  height: 54px;
`

const StyledOutlinedInput = styled(OutlinedInput)`
  width: 600px;
`

const buttonTextfontSize = css`
  font-size: 18px;
`

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
    <StyledForm onSubmit={handleSearchFormSubmit}>
      <StyledOutlinedInput
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
        css={mgRight(10)}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        css={buttonTextfontSize}
      >
        검색
      </Button>
    </StyledForm>
  )
}

export default SearchForm
