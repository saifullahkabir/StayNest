import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const UpdateProfileModal = () => {
    const { user, updateUserProfile, loading, setLoading } = useAuth();

    // update Profile
    const handleUpdateProfile = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const image = form.image.files[0];
        console.log(name);

        const oldName = user?.displayName;
        const oldImage = user?.photoURL;

        // Name must not be empty (even spaces only)
        if (!name) {
            return toast.error('Name is required!')
        }

        if (name === oldName && !image) {
            toast.error('You must change name or select a new image to update.');
            return;
        }

        try {
            setLoading(true);

            // user image
            let image_url = oldImage;

            // Upload new image and get image url
            if (image) {
                image_url = await imageUpload(image);
            }

            // 3. save user name and photo in firebase
            await updateUserProfile(name, image_url);
            toast.success('Profile Updated!')
            setLoading(false)
        }
        catch (err) {
            toast.error(err.message);
            console.log(err);
            setLoading(false);
        }
    }
    return (
        <>
            <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1' onClick={() => document.getElementById('update_profile_modal').showModal()}>Update Profile</button>
            <dialog id="update_profile_modal" className="modal">
                <div className="modal-box max-w-md xl:max-w-lg md:ml-52 xl:ml-64">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='space-y-4'>
                        <form
                            onSubmit={handleUpdateProfile}
                            className='space-y-4'
                        >
                            <div>
                                <label htmlFor='name' className='block mb-2 text-sm'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    defaultValue={user?.displayName}
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 placeholder:text-gray-800'
                                    data-temp-mail-org='0'
                                />
                            </div>
                            <div>
                                <label htmlFor='image' className='block mb-2 text-sm'>
                                    Select Image:
                                </label>
                                <input
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 placeholder:text-gray-800'
                                />
                            </div>
                            <div>
                                <button
                                    disabled={loading}
                                    type='submit'
                                    className='bg-rose-500 w-full rounded-md py-3 text-white mt-1'
                                >
                                    {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default UpdateProfileModal;