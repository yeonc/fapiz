import Typo from 'components/common/typo'

type PostImageUploadCaptionTypoProps = {
  children: string
}

const PostImageUploadCaptionTypo = ({
  children,
}: PostImageUploadCaptionTypoProps) => <Typo variant="caption">{children}</Typo>

export default PostImageUploadCaptionTypo
