import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import HostRequestModel from '../../Modal/HostRequestModel'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  // Update status
  const { mutateAsync } = useMutation({
    mutationFn: async (userData) => {
      console.log(userData);
      const { data } = await axiosSecure.put(`/users`, userData);
      return data;
    },

  })

  const modalHandler = async () => {
    try {
      const userData = {
        name: user?.name,
        email: user?.email,
        role: 'guest',
        status: 'Requested'
      }
      const data = await mutateAsync(userData);
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation');
      }
      else {
        toast.success('Please!, Wait for admin approval')
      }
    }
    catch (err) {
      toast.error(err.message);
    }
    finally {
      closeModal();
    }
  }

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                className='W-[30px] h-[30px] lg:w-[200px] lg:h-[40px]'
                src='https://i.ibb.co.com/cXF3xvYw/Adobe-Express-file.png'
                alt='logo'

              />
            </Link>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Become A Host btn */}
                <div className='hidden md:block'>
                  {user && (
                    <button
                      disabled={!user}
                      onClick={() => setIsModalOpen(true)}
                      className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                    >
                      Host your home
                    </button>
                  )}
                </div>
                {/* Modal */}
                <HostRequestModel isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler} />
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='px-2 py-1 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className=''>
                    {/* Avatar */}
                    <img
                      className='rounded-full w-[30px] h-[30px]'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'

                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
