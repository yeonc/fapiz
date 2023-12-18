import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { LogoutResponse } from 'types/auth'

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
) => {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )
    res.status(200).json({ message: '로그아웃에 성공했습니다.' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method Not Allowed: ${req.method}` })
  }
}

export default logout
