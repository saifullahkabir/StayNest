import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModal';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth';
const UserDataRow = ({ user, refetch }) => {
    const { user: loggedInUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (userData) => {
            const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, userData);
            console.log(data);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('User role updated successfully!');
            setIsOpen(false);
        },
    })

    const modalHandler = async (selected) => {
        if (loggedInUser?.email === user?.email) {
            toast.error('Action Not Allowed!');
            setIsOpen(false);
            return;
        }

        const userData = {
            role: selected,
            status: 'Verified',
            email: user?.email
        }

        try {
            await mutateAsync(userData);
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {user?.status ? (
                    <p
                        className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
                            } whitespace-no-wrap`}
                    >
                        {user.status}
                    </p>
                ) : (
                    <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
                )}
            </td>

            <td className='px-3 py-3 xl:py-4 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative whitespace-nowrap'>Update Role</span>
                </button>
                {/* Update User Modal */}
                <UpdateUserModal
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    modalHandler={modalHandler}
                    user={user}
                ></UpdateUserModal>
            </td>
        </tr>
    )
}

UserDataRow.propTypes = {
    user: PropTypes.object,
    refetch: PropTypes.func,
}

export default UserDataRow