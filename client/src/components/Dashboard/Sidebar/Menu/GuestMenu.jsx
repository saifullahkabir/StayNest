import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import HostRequestModel from '../../../Modal/HostRequestModel'

const GuestMenu = ({handleToggle}) => {
  const [role] = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  }

  // Update status
  const { mutateAsync } = useMutation({
    mutationFn: async (userData) => {
      console.log(userData);
      const { data } = await axiosSecure.put(`/user`, userData);
      return data;
    },

  })

  const modalHandler = async () => {
    try {
      const userData = {
        name: user?.displayName,
        email: user?.email,
        role: 'guest',
        status: 'Requested'
      }
      const data = await mutateAsync(userData);
      console.log(data, 'data');
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
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
        handleToggle={handleToggle}
      />

      {role === 'guest' && (<div
        onClick={() => setIsModalOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </div>)}
      {/* Modal */}
      <HostRequestModel isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler} />
    </>
  )
}

export default GuestMenu