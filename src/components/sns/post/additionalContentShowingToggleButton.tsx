import { css } from '@emotion/react'
import Link from '@mui/material/Link'
import { DEFAULT_GRAY } from 'styles/constants/color'

const buttonTextColor = css`
  font-weight: 700;
  color: ${DEFAULT_GRAY};
`

type AdditionalContentShowingToggleButtonProps = {
  isHiddenContentShowed: boolean
  onContentShowMoreButtonClick: () => void
  onContentHideButtonClick: () => void
}

const AdditionalContentShowingToggleButton = ({
  isHiddenContentShowed,
  onContentHideButtonClick,
  onContentShowMoreButtonClick,
}: AdditionalContentShowingToggleButtonProps) => (
  <>
    {isHiddenContentShowed ? (
      <Link
        component="button"
        onClick={onContentHideButtonClick}
        css={buttonTextColor}
      >
        ━━ 내용 접어두기
      </Link>
    ) : (
      <Link
        component="button"
        onClick={onContentShowMoreButtonClick}
        css={buttonTextColor}
      >
        ━━ 내용 더 보기
      </Link>
    )}
  </>
)

export default AdditionalContentShowingToggleButton
