import { FC } from 'react'
import {User} from 'next-auth'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
  return <div>UserAccountNav</div>
}


export default UserAccountNav