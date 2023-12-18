import axios, { AxiosResponse } from 'axios'
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import { AccessToken, AuthResponse } from 'types/auth'
import { Nullable } from 'types/common'
import { User } from 'types/user'

type AuthContextType = {
  me: Nullable<User>
  error: Nullable<string>
  isLoading: boolean
  login: (accessToken: AccessToken) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<Nullable<User>>(null)
  const [error, setError] = useState<Nullable<string>>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const login = async (accessToken: AccessToken): Promise<void> => {
    setError(null)
    try {
      const res: AxiosResponse<AuthResponse> = await axios({
        method: 'post',
        url: '/api/login',
        data: { accessToken },
      })
      if (res.data.result === 'success') {
        setMe(res.data.user)
      }
    } catch {
      setMe(null)
      setError('로그인되지 않았습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setError(null)
    try {
      await axios({
        method: 'post',
        url: '/api/logout',
      })
      setMe(null)
    } catch {
      setError('로그아웃에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const checkUserLoggedIn = async (): Promise<void> => {
    setError(null)
    try {
      const res: AxiosResponse<AuthResponse> = await axios({
        method: 'get',
        url: '/api/me',
      })
      if (res.data.result === 'success') {
        setMe(res.data.user)
      }
    } catch {
      setMe(null)
      setError('로그인되지 않았습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ me, error, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error(
      'useAuth는 <AuthContext.Provider> 내부에서 사용되어야 합니다.'
    )
  }
  return authContext
}
