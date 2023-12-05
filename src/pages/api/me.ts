import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import fetchMe from 'services/auth/fetchMe'
import { AuthResponse } from 'types/auth'

const checkAuth = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res
        .status(401)
        .json({ result: 'fail', message: '사용자가 존재하지 않습니다.' })
      return
    }

    const { jwt } = cookie.parse(req.headers.cookie)
    if (!jwt) {
      res
        .status(401)
        .json({ result: 'fail', message: '사용자가 존재하지 않습니다.' })
      return
    }

    try {
      const authRes = await fetchMe(jwt)
      res.status(200).json({
        result: 'success',
        message: '사용자가 인증되었습니다.',
        user: authRes.data,
      })
    } catch {
      res
        .status(401)
        .json({ result: 'fail', message: '사용자 인증에 실패했습니다.' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res
      .status(405)
      .json({ result: 'fail', message: `Method Not Allowed: ${req.method}` })
  }
}

export default checkAuth
