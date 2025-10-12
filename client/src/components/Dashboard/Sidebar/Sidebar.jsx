import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsGraphUp } from 'react-icons/bs'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { HiOutlineX } from "react-icons/hi";
import { VscThreeBars } from "react-icons/vsc";
import useRole from '../../../hooks/useRole'
import MenuItem from './Menu/MenuItem'
import HostMenu from './Menu/HostMenu'
import AdminMenu from './Menu/AdminMenu'
import GuestMenu from './Menu/GuestMenu'
import ToggleBtn from '../../Shared/Button/ToggleBtn'

const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(true)
    const [role] = useRole();
    const [toggle, setToggle] = useState(true);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co.com/cXF3xvYw/Adobe-Express-file.png'
                                alt='logo'
                                width='120'
                                height='120'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 '
                >
                    {
                        isActive ?
                            (<VscThreeBars className='h-6 w-6' />)
                            :
                            (<HiOutlineX className='h-6 w-6 '
                            />)
                    }
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 md:w-52 xl:w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full  px-4 py-2  justify-center items-center  mx-auto'>
                            <Link to='/'>
                                <img
                                    className='w-[120px] md:w-[150px] h-full'
                                    src='https://i.ibb.co.com/cXF3xvYw/Adobe-Express-file.png'
                                    alt='logo'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        {/* Conditional toggle button here.. */}
                        {role === 'host' && <ToggleBtn toggleHandler={toggleHandler} toggle={toggle} />}

                        {/*  Menu Items */}
                        <nav>
                            {/* Statistics */}
                            <MenuItem
                                label='Statistics'
                                address='/dashboard'
                                icon={BsGraphUp}
                            ></MenuItem>

                            {role === 'guest' && <GuestMenu />}
                            {role === 'host' ? toggle ? <HostMenu /> : <GuestMenu /> : undefined}
                            {role === 'admin' && <AdminMenu />}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    {/* Profile Menu */}
                    <MenuItem
                        label='Profile'
                        address='/dashboard/profile'
                        icon={FcSettings}
                    ></MenuItem>

                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar