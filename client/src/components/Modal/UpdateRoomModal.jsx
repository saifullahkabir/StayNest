import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import UpdateRoomForm from '../Form/UpdateRoomForm'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { imageUpload } from '../../api/utils'
import { useMutation } from '@tanstack/react-query'

const UpdateRoomModal = ({ setIsEditModalOpen, isOpen, room, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [roomData, setRoomData] = useState(room);
    const [loading, setLoading] = useState(false);

    const [dates, setDates] = useState({
        startDate: new Date(room?.from),
        endDate: new Date(room?.to),
        key: 'selection'
    });




    // handle image update
    const handleImage = async image => {
        setLoading(true);
        try {
            const image_url = await imageUpload(image);
            console.log(image_url);
            setRoomData({ ...roomData, image: image_url });

        }
        catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    }

    // Date range Handler
    const handleDates = item => {
        setDates(item.selection);
        setRoomData({
            ...roomData,
            to: item.selection.endDate,
            from: item.selection.startDate,
        });
    }

    const { mutateAsync } = useMutation({
        mutationFn: async updatedRoomData => {
            const { data } = await axiosSecure.put(`/room/update/${room?._id}`, updatedRoomData);
            return data;
        },
        onSuccess: () => {
            toast.success('Room data Updated!');
            refetch();
            setIsEditModalOpen(false);
            setLoading(false);
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedRoomData = Object.assign({}, roomData);
        delete updatedRoomData._id;
        console.log(updatedRoomData);
        try {
            await mutateAsync(updatedRoomData);
        }
        catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-30'
                onClose={() => setIsEditModalOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Update Room Info
                                </DialogTitle>
                                <div className='mt-2 w-full'>
                                    {/* Update room form */}
                                    <UpdateRoomForm
                                        handleSubmit={handleSubmit}
                                        dates={dates}
                                        handleDates={handleDates}
                                        roomData={roomData}
                                        setRoomData={setRoomData}
                                        handleImage={handleImage}
                                        loading={loading}
                                    />
                                </div>
                                <hr className='mt-8 ' />
                                <div className='mt-2 '>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 ml-2 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={() => setIsEditModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

UpdateRoomModal.propTypes = {
    setIsEditModalOpen: PropTypes.func,
    isOpen: PropTypes.bool,
    room: PropTypes.object,
    refetch: PropTypes.func
}

export default UpdateRoomModal;