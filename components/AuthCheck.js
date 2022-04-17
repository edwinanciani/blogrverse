import { useAuth } from '../lib/context'
import Link from 'next/link'

const AuthCheck = (props) => {
  const {user} = useAuth()
  return user ?
          props.children : props.fallback || <Link href="/admin/auth">You must be logged in</Link>
}

export default AuthCheck
