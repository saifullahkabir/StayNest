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
import { useToggle } from '../../../context/ToggleContext'

const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(true)
    const [role] = useRole();
    // const [toggle, setToggle] = useState(true);
    const { isGuestView, toggleView } = useToggle();

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    // const toggleHandler = () => {
    //     setToggle(!toggle);
    // }

    return (
        <>
            {/* Small Screen Navbar */}
            {
                isActive && (
                    <div className='mb-12 md:mb-0'>
                        <div className='fixed top-0 left-0 w-full z-20  bg-gray-50 shadow-md  text-gray-800 flex justify-between md:hidden'>
                            <div>
                                <div className='block cursor-pointer p-4 font-bold'>
                                    <Link to='/'>
                                        <img
                                            // className='hidden md:block'
                                            src='https://i.ibb.co.com/cXF3xvYw/Adobe-Express-file.png'
                                            alt='logo'
                                            width='130'
                                            height='130'
                                        />
                                    </Link>
                                </div>
                            </div>

                            {
                                isActive && <button
                                    onClick={handleToggle}
                                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 '
                                >
                                    <VscThreeBars className='h-7 w-7' />
                                </button>
                            }
                        </div>
                    </div>
                )
            }
            {/* Overlay (blur background when sidebar open) */}
            {
                !isActive && (
                    <div onClick={handleToggle}
                        className='fixed inset-0 bg-black/30  z-10 md:hidden transition-opacity duration-300'
                    ></div>
                )
            }

            {/* Sidebar */}
            <div
                className={`z-20 fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-60 md:w-52 xl:w-64 space-y-6 px-2 py-4 h-screen transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-300 ease-in-out`}
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
                        {role === 'host' && <ToggleBtn toggleHandler={toggleView} toggle={isGuestView} />}

                        {/*  Menu Items */}
                        <nav>
                            {/* Statistics */}
                            <MenuItem
                                label='Statistics'
                                address='/dashboard'
                                icon={BsGraphUp}
                                handleToggle={handleToggle}
                            ></MenuItem>

                            {role === 'guest' && <GuestMenu handleToggle={handleToggle} />}
                            {role === 'host' && (isGuestView ?
                                <GuestMenu handleToggle={handleToggle} />
                                :
                                <HostMenu handleToggle={handleToggle} />)}
                            {role === 'admin' && <AdminMenu handleToggle={handleToggle}/>}
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
                        handleToggle={handleToggle}
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