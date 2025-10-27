import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = ({ handleToggle }) => {
  return (
    <>
      <MenuItem
        handleToggle={handleToggle}
        icon={FaUserCog}
        label='Manage Users'
        address='manage-users' />
    </>
  )
}

export default AdminMenu