import { ReactNode, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useAuthStore } from '../store/auth'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth, role } = useAuthStore()
  const [, navigate] = useLocation()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    } else if (role === 'MANAGER') {
      navigate('/admin-dashboard')
    } else if (role === 'CONSULTANT') {
      navigate('/consultant-dashboard')
    }
  }, [isAuth, role, navigate])

  return (
    <>
      {isAuth && (role === 'MANAGER' || role === 'CONSULTANT')
        ? children
        : null}
    </>
  )
}

export default ProtectedRoute
