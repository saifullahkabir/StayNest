import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal';

const BookingDataRow = ({ booking, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleDelete = async id => {
        console.log(id);
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={booking?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={booking?.guest?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                            {booking?.guest?.name}
                        </p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(booking?.from), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(booking?.to), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button
                    onClick={() => setIsOpen(true)}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Cancel</span>
                </button>
                {/* Delete modal */}
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                    id={booking?._id} />
            </td>
        </tr>
    )
}

BookingDataRow.propTypes = {
    booking: PropTypes.object,
    refetch: PropTypes.func,
}

export default BookingDataRow