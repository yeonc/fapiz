import Typo from 'components/common/typo'

type ImageUploadCaptionTypoProps = {
  children: string
}

const ImageUploadCaptionTypo = ({ children }: ImageUploadCaptionTypoProps) => (
  <Typo variant="caption">{children}</Typo>
)

export default ImageUploadCaptionTypo
