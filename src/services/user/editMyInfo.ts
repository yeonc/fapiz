import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/common'
import { Id, Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'
import { BodyShape, Gender } from 'types/user'

type EditMyInfoArgs = {
  myId: Id
  profileImageId?: Id
  username: string
  gender: Gender | ''
  height: Nullable<number>
  weight: Nullable<number>
  bodyShape: BodyShape | ''
  fashionStyles: FashionStyle[]
}

type EditMyInfo = (args: EditMyInfoArgs) => Promise<AxiosResponse>

const editMyInfo: EditMyInfo = async ({
  myId,
  profileImageId,
  username,
  gender,
  height,
  weight,
  bodyShape,
  fashionStyles,
}) => {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/api/users/${myId}`,
    data: {
      profileImage: profileImageId,
      username,
      gender: gender === '' ? null : gender,
      height,
      weight,
      bodyShape: bodyShape === '' ? null : bodyShape,
      fashionStyles: fashionStyles.length === 0 ? null : fashionStyles,
    },
  })
}

export default editMyInfo
