import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const HostMenu = ({ handleToggle }) => {
    return (
        <>
            <MenuItem
                handleToggle={handleToggle}
                icon={BsFillHouseAddFill}
                label='Add Room'
                address='add-room' />

            <MenuItem
                handleToggle={handleToggle}
                icon={MdHomeWork}
                label='My Listings'
                address='my-listings' />

            <MenuItem
                handleToggle={handleToggle}
                icon={MdOutlineManageHistory}
                label='Manage Bookings'
                address='manage-bookings'
            />
        </>
    )
}

export default HostMenu