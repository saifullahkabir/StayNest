
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';

const ChangePassModal = () => {
    const { user, resetPassword, loading, setLoading } = useAuth();

    // reset password
    const handleResetPassword = async () => {

        try {
            await resetPassword(user?.email);
            toast.success('Request Success! Check your email for further process...')
            setLoading(false)
        }
        catch (err) {
            toast.error(err.code);
            setLoading(false);
        }
    }
    return (
        <div>
            {/* Modal for change password */}
            <button className='bg-[#F43F5E] px-[30px] py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]' onClick={() => document.getElementById('my_modal_3').showModal()}>Change Password</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-md xl:max-w-lg md:ml-52 xl:ml-64">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email
                            </label>
                            <input
                                type='email'
                                disabled
                                placeholder={user?.email}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 placeholder:text-gray-800'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleResetPassword}
                                disabled={loading}
                                type='submit'
                                className='bg-rose-500 w-full rounded-md py-3 text-white'
                            >
                                {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Change Password'}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ChangePassModal;