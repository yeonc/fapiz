import styled from '@emotion/styled'
import { DEFAULT_RED } from 'styles/constants/color'

const FASHION_ITEM_CREATE_FAIL_MESSAGE = '패션 아이템 등록에 실패했습니다.'
const FASHION_ITEM_EDIT_FAIL_MESSAGE = '패션 아이템 수정에 실패했습니다.'
const FASHION_ITEM_DELETE_FAIL_MESSAGE = '패션 아이템 삭제에 실패했습니다.'

const StyledErrorMessage = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  color: ${DEFAULT_RED};
`

export type ErrorType =
  | 'fashionItemCreateError'
  | 'fasionItemEditError'
  | 'fashionItemDeleteError'

const ErrorMessage = ({ type }: { type: ErrorType }) => {
  if (type === 'fashionItemCreateError') {
    return (
      <StyledErrorMessage>
        {FASHION_ITEM_CREATE_FAIL_MESSAGE}
      </StyledErrorMessage>
    )
  }

  if (type === 'fasionItemEditError') {
    return (
      <StyledErrorMessage>{FASHION_ITEM_EDIT_FAIL_MESSAGE}</StyledErrorMessage>
    )
  }

  return (
    <StyledErrorMessage>{FASHION_ITEM_DELETE_FAIL_MESSAGE}</StyledErrorMessage>
  )
}

export default ErrorMessage
