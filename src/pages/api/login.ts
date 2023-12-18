import { NextApiRequest, NextApiResponse } from 'next'
import loginWithGoogle from 'services/auth/loginWithGoogle'
import { AuthResponse } from 'types/auth'
import cookie from 'cookie'

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) => {
  if (req.method === 'POST') {
    const { accessToken } = req.body
    try {
      const loginRes = await loginWithGoogle(accessToken)
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', loginRes.data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(200).json({
        result: 'success',
        message: '로그인에 성공했습니다.',
        user: loginRes.data.user,
      })
    } catch {
      res
        .status(400)
        .json({ result: 'fail', message: '로그인에 실패했습니다.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res
      .status(405)
      .json({ result: 'fail', message: `Method Not Allowed: ${req.method}` })
  }
}

export default login
