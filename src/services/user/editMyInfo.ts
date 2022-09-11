import axios, { AxiosResponse } from 'axios'
import { BACKEND_URL } from 'constants/constants'
import { Nullable } from 'types/common'
import { FashionStyle } from 'types/fashion'

// TODO: height, weight, fashionStyles 타입은 임시로 써 놓은 것이니 고치기
type EditMyInfoArgs = {
  myId: number
  profileImageId?: number
  username: string
  gender: Nullable<string>
  height: Nullable<number>
  weight: Nullable<number>
  bodyShape: Nullable<string>
  fashionStyles: Nullable<FashionStyle[]>
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
      gender,
      height,
      weight,
      bodyShape,
      fashionStyles,
    },
  })
}

export default editMyInfo
